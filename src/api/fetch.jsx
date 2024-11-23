import axiosInstance from "./axiosInstance";

export const fetchAuctionPlayers = async (playerId, auctionId) => {
  try {
    const response = await axiosInstance.get("/auction-players", {
      params: { playerId, auctionId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching auction players:", error);
    throw error;
  }
};

export const fetchplayers = async () => {
  try {
    const response = await axiosInstance.get("/players");
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error("Auction not found");
    } else if (error.response && error.response.status === 500) {
      throw new Error("Server error");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get("/users/getAll");
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error("Auction not found");
    } else if (error.response && error.response.status === 500) {
      throw new Error("Server error");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const getBidHistoryOfPlayers = async (auctionId = 3) => {
  try {
    const response = await axiosInstance.get(
      `/auction-players/${auctionId}/bids`
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error("Auction not found");
    } else if (error.response && error.response.status === 500) {
      throw new Error("Server error");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const getAuctionPlayersByID = async (playerId, auctionId) => {
  try {
    const response = await axiosInstance.get(
      `auction-players?playerId=${playerId}&auctionId=${auctionId}`
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error("Auction not found");
    } else if (error.response && error.response.status === 500) {
      throw new Error("Server error");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
