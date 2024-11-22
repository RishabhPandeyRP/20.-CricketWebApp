import axiosInstance from "./axiosInstance";

export const fetchAuctionPlayers = async (playerId, auctionId) => {
  try {
    const response = await axiosInstance.get("/auction-players", {params: {playerId,auctionId,},});
    return response.data;
  } catch (error) {
    console.error("Error fetching auction players:", error);
    throw error;
  }
};
