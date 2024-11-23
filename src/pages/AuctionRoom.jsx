import { useEffect, useState, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import SocketService from "../socket/socketService";
import { getAuctionPlayersByID } from "../api/fetch";
import { ArrowUpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import TimerComponent from "../components/TimerComponent";

const AuctionRoom = () => {
  const navigate = useNavigate();
  const [currentBid, setCurrentBid] = useState(0);
  const [error, setError] = useState(null);
  const [roomSize, setRoomSize] = useState(0);

  const [activePlayer, setActivePlayer] = useState(null);
  const [remainingPlayers, setRemainingPlayers] = useState(0);

  const [isConnected, setIsConnected] = useState(false);
  const [currentBids, setCurrentBids] = useState([]);

  const [budget, setBudget] = useState({ remaining: 1000, total: 1000 });

  const location = useLocation();
  const auctionId = location?.state?.auction?.id || "defaultAuction";
  const { userId, token } = useSelector((state) => state.user);
  const [activePlayerId, setActivePlayerId] = useState(null);

  // const [bidAmount, setBidAmount] = useState(0);
  const [jump, setJump] = useState(100);
  const [activePlayerName, setActivePlayerName] = useState("");

  const timerRef = useRef(null);

  useEffect(() => {
    const fetchPlayerById = async () => {
      try {
        if (roomSize >= 2 && activePlayer?.playerId) {
          const res = await getAuctionPlayersByID(
            activePlayer?.playerId,
            auctionId
          );
          console.log(res, "fetchPlayerById");
          // if (timerRef.current) {
          //   timerRef.current.startTimer();
          // }
          setActivePlayer(res?.player);
          setActivePlayerId(res?.id);
          setCurrentBid(res.currentBid !== null ? res.currentBid : 0);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchPlayerById();
  }, [activePlayer?.playerId, roomSize, auctionId]);

  const setupSocketListeners = useCallback(() => {
    SocketService.onRoomSize((data) => {
      console.log("Received room size:", data.roomSize);
      setRoomSize(data.roomSize);
    });
    SocketService.onActivePlayer((data) => {
      setActivePlayer(data);
      setActivePlayerName(data?.player?.name);
    });
    SocketService.onPlayerCount((data) => setRemainingPlayers(data?.count));

    SocketService.onNewUserConnected("new user connected");

    SocketService.onUserDisconnected((data) =>
      console.log("user disconnected", data)
    );

    SocketService.onNewBid((data) => {
      // if (timerRef.current) {
      //   timerRef.current.resetTimer();
      // }
      toast.success(`${data.amount}Cr Bid is Placed`);
      const updatedBudget = {
        remaining: budget.remaining - data.amount,
        total: budget.total,
      };

      setBudget(updatedBudget);
      setCurrentBid(data.amount);
    });

    SocketService.onBudgetUpdate((data) => console.log("Budget Update", data));

    SocketService.onAskNewPlayer(() => {
      console.log("Askinged new player:");
      toast.success(
        `Current Player "${activePlayerName}" is sold Successfully!`
      );
      // if (timerRef.current) {
      //   timerRef.current.startTimer();
      // }
    });

    SocketService.onError((error) => {
      setError(error.message);
    });
  }, []);

  const setupSocketConnection = async (token, auctionId) => {
    try {
      const response = await SocketService.connect(token, auctionId);
      console.log("Socket connection established:", response);
      if (response.connected) return response;
    } catch (error) {
      console.error("Failed to connect socket:", error);
      return false;
    }
  };

  const handleTimerEnd = () => {
    console.log("Timer has run out!");
  };

  useEffect(() => {
    // const timerRefrence = timerRef.current;
    const initializeSocket = async () => {
      try {
        const token = userId;
        const response = await setupSocketConnection(token, auctionId);

        if (response.connected) {
          setupSocketListeners();
          setIsConnected(true);
          SocketService.emitGetRoomSize();
          SocketService.emitGetActivePlayer();
          SocketService.emitGetBudget();
          SocketService.emitGetPlayerCount();

          // if (timerRefrence) {
          //   timerRefrence.startTimer();
          // }
        }
      } catch (error) {
        console.error("Failed to initialize socket:", error);
      }
    };

    initializeSocket();

    return () => {
      console.log("Cleaning up socket connection...");
      SocketService.disconnect();
      setIsConnected(false);

      // if (timerRefrence) {
      //   timerRefrence.resetTimer();
      // }
    };
  }, [auctionId, userId, setupSocketListeners]);

  const placeBid = (amount) => {
    if (!isConnected || !activePlayer || roomSize < 2) {
      console.warn("Cannot place bid:", { isConnected, activePlayer });
      return;
    }
    if (activePlayerId) {
      SocketService.emitBid(activePlayerId, amount);
    }
  };

  const ConnectionStatus = () => (
    <div
      className={`px-4 py-2 rounded-full text-sm ${
        isConnected ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
      }`}
    >
      {isConnected ? "Connected" : "Disconnected"}
    </div>
  );

  return (
    <div className="flex flex-col h-screen">
      <Header heading={`Auction Room #${auctionId}`}>
        <ConnectionStatus />
      </Header>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative m-4">
          {error}
        </div>
      )}

      {roomSize >= 2 && remainingPlayers > 0 ? (
        <div className="flex-1 w-full font-sans flex flex-col items-center justify-between relative">
          <div className="rounded-lg p-4 mt-4 w-full flex justify-center relative">
            <div className="absolute top-0 left-10">
              <img
                src={activePlayer?.image || "https://via.placeholder.com/150"}
                alt="Player"
                className="w-36 h-36 rounded-full border-4 border-gray-200"
              />
            </div>

            <div className="text-xs text-gray-600 w-[70%]">
              <p className="border-2 border-t-zinc-200 py-1 px-2 text-end">
                Type: {activePlayer?.role || "N/A"}
              </p>
              <p className="border-2 border-b-zinc-200 py-1 px-2 text-end">
                Matches: {activePlayer?.matches || 0}
              </p>
              <p className="border-2 border-b-zinc-200 py-1 px-2 text-end">
                Sr Rate: {activePlayer?.strikeRate || 0}
              </p>
              <p className="border-2 border-b-zinc-200 py-1 px-2 text-end">
                Base Price: {activePlayer?.basePrice || "N/A"}
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold m-2 text-center">
            {activePlayer?.name || "Fetching player..."}
          </h2>

          <div className="bg-white shadow-2xl m-3 py-4 px-12 rounded-3xl text-center w-fit">
            <p className="text-blue-600 text-5xl font-bold mb-2">
              {currentBid}
              <span className="text-2xl"> Cr</span>
            </p>
            <h3 className="text-black text-2xl font-bold">Current Bid</h3>
          </div>

          <div className="bg-white shadow mt-6 rounded-lg w-[95%] overflow-hidden">
            <h3 className="text-black font-bold bg-zinc-300 py-2 px-4 text-start text-sm">
              CURRENT BIDS
            </h3>

            <table className="w-full text-center py-4 px-4">
              <thead>
                <tr className="font-bold text-sm">
                  <th className="py-2 px-2"></th>
                  <th className="py-2 px-2">Bid</th>
                  <th className="py-2 px-2">Players</th>
                  <th className="py-2 px-2">Purse</th>
                </tr>
              </thead>

              <tbody className="font-bold">
                {currentBids.map((bid, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4 flex items-center justify-start space-x-3">
                      <img
                        src={bid.logo || "https://via.placeholder.com/50"}
                        alt={`${bid.team} logo`}
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex flex-col items-start">
                        <span className="font-bold text-sm">{bid.team}</span>
                        <span className="text-black text-sm font-bold">
                          {bid.user}
                        </span>
                      </div>
                    </td>

                    <td className="py-1 px-2 text-sm">{bid.bid}Cr</td>
                    <td className="py-1 px-2 text-sm">{bid.players}</td>
                    <td className="py-1 px-2 text-sm">{bid.purse}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white mt-4 p-4 rounded-lg w-full">
            <div className="flex justify-between items-center mb-2">
              <span className="text-red-500 font-bold text-xl">
                {budget.remaining}Cr Left
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full">
              <div
                className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-5 rounded-full"
                style={{ width: `${(budget.remaining / budget.total) * 100}%` }}
              ></div>
            </div>

            <div className="flex justify-between mt-2 font-bold text-md">
              <span>Budget</span>
              <span>
                <span className="text-red-500">{budget.remaining}/</span>{" "}
                {budget.total} Cr
              </span>
            </div>
          </div>

          <div className="w-full shadow p-2 py-3 border-[3px] border-black rounded-full flex justify-between items-center font-medium text-md">
            <button
              onClick={() => SocketService.emitGetActivePlayer()}
              className="flex-1/4  bg-blue-700 text-white py-[0.6rem] px-2 rounded-3xl text-center text-sm sm:text-base font-semibold"
            >
              PULL BACK
            </button>

            <button
              onClick={() => console.log("Jump clicked")}
              className="flex-1/4 mx-1 bg-blue-700 text-white py-2 px-3 rounded-3xl flex items-center justify-between gap-1 text-center text-sm sm:text-base font-semibold"
            >
              <span className="inline-block text-[0.7rem] w-6 h-6 border-2 border-blue-950 rounded-full bg-white text-blue-600">
                {jump}
              </span>
              JUMP
            </button>

            <button
              onClick={() => placeBid(currentBid + jump)}
              className="flex-1/4 mx-1 bg-blue-700 text-white py-2 px-3 rounded-3xl text-center text-sm sm:text-base flex items-center justify-between gap-1 font-semibold"
            >
              <span className="inline-block text-[0.7rem] w-6 h-6 border-2 border-blue-950 rounded-full bg-white text-blue-600">
                {currentBid + jump}
              </span>
              INCREASE BID
            </button>
          </div>

          <div className="fixed right-2 top-[40%] transform -translate-y-1/2 flex flex-col items-center space-y-4">
            {/* <button
              className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              onClick={() => console.log("Button 1 clicked")}
            >
              1
            </button>
            <button
              className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
              onClick={() => console.log("Button 2 clicked")}
            >
              2
            </button> */}
            <button
              className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
              onClick={() => console.log("Button 3 clicked")}
            >
              <TimerComponent ref={timerRef} onTimerEnd={handleTimerEnd} />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-100">
          <div className="p-6 text-center max-w-sm">
            <div className="flex justify-center items-center mb-4">
              <ArrowUpCircle className="h-10 w-10 text-blue-500" />
            </div>
            <h1 className="text-xl font-semibold text-gray-800">Room Status</h1>
            {isConnected ? (
              remainingPlayers < 1 ? (
                <p className="text-gray-600 mt-2 font-medium my-4">
                  <span className="block font-bold text-3xl">
                    Auction is Ended
                  </span>
                  <span className="block">No remaining players to be sold</span>
                </p>
              ) : (
                <p className="text-gray-600 mt-2 font-medium my-4">
                  <span className="block font-bold text-xl">
                    Waiting for other players to join
                  </span>
                  <span className="block">
                    {" "}
                    The room size is currently less than 2. Please wait or check
                    back later.
                  </span>
                </p>
              )
            ) : (
              <p className="text-gray-600 mt-2 font-medium">
                Connecting to auction room...
              </p>
            )}
            <button
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-900 focus:ring-2 focus:ring-blue-300 focus:outline-none"
              onClick={() => navigate("/home")}
            >
              Leave Room
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuctionRoom;
