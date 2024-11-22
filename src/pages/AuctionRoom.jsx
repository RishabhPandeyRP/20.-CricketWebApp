import { fetchAuctionPlayers } from "../api/fetch";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../components/Header";

const dummyData = {
  room: "AuctionRoom#101",
  player: {
    name: "Umar Malik",
    role: "Batsmen",
    matches: 200,
    strikeRate: 150.6,
    basePrice: "10Cr",
    image: "https://via.placeholder.com/150",
  },
  currentBid: 18,
  timer: "00:02",
  currentBids: [
    { team: "Bangalore", user: "@anikets", bid: 18, players: 9, purse: "30Cr" },
    { team: "Mumbai", user: "@jitu", bid: 16, players: 8, purse: "40Cr" },
  ],
  budget: {
    remaining: 60,
    total: 100,
  },
};

const AuctionRoom = () => {
  const { room, player, currentBid, timer, currentBids, budget } = dummyData;
  const [playerDetails, setPlayerDetails] = useState(null);
  const location = useLocation();
  const auctionId = location.state.auction.id;
  const { userId } = useSelector((state) => state.user);
  const auctionData = location.state.auction;

  const getAuctionPlayers = async () => {
    try {
      const data = await fetchAuctionPlayers(userId, auctionId);
      setPlayerDetails(data);
      console.log("data", data);
    } catch (error) {
      console.error("Failed to fetch auction players:", error);
    }
  };

  useEffect(() => {
    getAuctionPlayers();
    console.log(auctionData);
  }, []);

  return (
    <>
      <Header heading={room}></Header>
      <div className="bg-white h-fit w-full font-sans flex flex-col items-center justify-between relative">
        <div className="rounded-lg p-4 mt-4 w-full flex justify-center relative">
          <div className="absolute top-0 left-10">
            <img
              src={player.image}
              alt="Player"
              className="w-36 h-36 rounded-full border-4 border-gray-200"
            />
          </div>

          <div className="text-xs text-gray-600 w-[70%]">
            <p className="border-2 border-t-zinc-200 py-1 px-2 text-end">
              Type: {player.role}
            </p>
            <p className="border-2 border-b-zinc-200 py-1 px-2 text-end">
              Matches: {player.matches}
            </p>
            <p className="border-2 border-b-zinc-200 py-1 px-2 text-end">
              Sr Rate: {player.strikeRate}
            </p>
            <p className="border-2 border-b-zinc-200 py-1 px-2 text-end">
              Base Price: {player.basePrice}
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold m-2 text-center">{player.name}</h2>

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
                      src={bid.logo}
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
              <span className="text-red-500">40 /</span> 100 Cr
            </span>
          </div>
        </div>

        <div className="w-full shadow p-4 py-6 border-[3px] border-black rounded-3xl flex justify-between items-center font-medium text-md">
          <button className="flex-1/4 mx-1 bg-blue-700 text-white py-3 px-2 sm:px-4 rounded-3xl text-center text-sm sm:text-base">
            PULL BACK
          </button>

          <button className="flex-1/4 mx-1 bg-blue-700 text-white py-2 px-2 sm:px-4 rounded-3xl flex items-center justify-center gap-2 text-sm sm:text-base">
            <span className="border-2 border-white p-1 rounded-full text-xs sm:text-sm">
              5/5
            </span>
            <span>JUMP</span>
          </button>

          <button className="flex-2/4 bg-blue-700 text-white py-2 px-2 sm:px-4 rounded-3xl flex items-center justify-center gap-2 text-sm sm:text-base">
            <span className="border-white border-2 p-1 sm:p-2 rounded-full text-xs sm:text-sm">
              18
            </span>
            OFFER +20CR
          </button>
        </div>
      </div>
    </>
  );
};

export default AuctionRoom;
