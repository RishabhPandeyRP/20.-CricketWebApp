import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import { getTeamResultOfAction } from "../../api/fetch";

const YourTeamPlayers = () => {
  const { auctionId, userId } = useParams();
  const [error, setError] = useState("");
  const [teamData, setTeamData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [teamName, setTeamName] = useState(null);
  const [auctionName, setAuctionName] = useState(null);

  useEffect(() => {
    const fetchPlayersBought = async () => {
      setIsLoading(true);
      if (!userId || !auctionId) return;
      const res = await getTeamResultOfAction(auctionId, userId);
      if (res) {
        setError("");
        setIsLoading(false);
        setAuctionName(res.teams[0].auction?.title);
        setTeamData(res.teams[0].auctionPlayers || []);
        setTeamName(res.teams[0]?.name);
      } else {
        setIsLoading(false);

        setError("Some Error Occured! Please try again.");
      }
    };

    fetchPlayersBought();
  }, [auctionId, userId]);

  return (
    <div className="flex flex-col h-dvh lg:h-screen">
      <Header heading={`Your Team`} />
      {!auctionId || !userId || error.length > 1 || isLoading ? (
        <div className="flex-1 flex items-center justify-center font-semibold">
          {!isLoading ? `Some Error Occured! Please try again.` : "Loading..."}
        </div>
      ) : (
        <div className="flex-1 flex flex-col px-4 overflow-y-scroll pb-6">
          <div className="py-4 px-2 font-medium">
            <p>Team Name: {teamName}</p>
            <p>Auction: {auctionName}</p>
          </div>
          {teamData.map((item, index) => {
            return (
              <div
                className="w-full shadow-2xl bg-white px-4 py-2 my-2 rounded-xl flex items-center gap-4 justify-between "
                key={index}
              >
                <div className="flex gap-2 items-center">
                  <div className="flex gap-2 justify-between items-center">
                    <p className="w-6 h-6 flex items-center justify-center bg-gray-200 text-gray-700 font-medium text-sm p-2 rounded-full">
                      {index + 1}
                    </p>
                    <div className="bg-zinc-200 w-14 h-14 rounded-full border-black border-2 overflow-hidden">
                      <img
                        src={item?.imageUrl}
                        alt="Player"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-lg">
                      {item?.player?.name || "N/A"}
                    </p>
                    <p className="text-red-700 font-semibold text-sm">
                      Sold for - {item?.currentBid || "N/A"}Cr
                    </p>
                    <p className="text-blue-700 font-semibold text-sm">
                      Base Price - {item?.startingBid || "N/A"}Cr
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center justify-end">
                    <p className="font-medium">{item.type}</p>
                    {/* <p className="text-xs">({item.order})</p> */}
                  </div>

                  {/* {item?.points !== null ||
                  (item?.points !== undefined && ( */}
                  <div className="text-red-700">
                    <p className="text-sm font-semibold text-gray-600">
                      Points
                    </p>
                    <p className="font-semibold">
                      {item?.points?.positions[index + 1] || "N/A"}
                    </p>
                  </div>
                </div>
                {/* ))} */}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default YourTeamPlayers;
