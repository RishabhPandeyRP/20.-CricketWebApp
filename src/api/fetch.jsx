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

export const getBidHistoryOfPlayers = async (activePlayerId) => {
  try {
    const response = await axiosInstance.get(
      `/auction-players/${activePlayerId}/bids`
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

export const getAllPLayersInAuction = async (auctionID) => {
  try {
    const response = await axiosInstance.get(`auctions/${auctionID}/players`);
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

export const clearBids = async (auctionId, auctionPlayerId) => {
  try {
    const payload = {
      auctionId,
      auctionPlayerId,
    };

    const response = await axiosInstance.post("bids/clear", payload);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        throw new Error("Endpoint not found");
      } else if (error.response.status === 400) {
        throw new Error("Bad request - invalid input data");
      } else if (error.response.status === 500) {
        throw new Error("Server error");
      }
    }
    throw new Error("An unexpected error occurred");
  }
};

export const getTeamResultOfAction = async (auctionId, userId) => {
  try {
    const num_auctionId = Number(auctionId);
    const num_userId = Number(userId);

    const payload = {
      auctionId: num_auctionId,
      userId: num_userId,
    };

    console.log("Payload being sent to API:", payload);

    const response = await axiosInstance.post(
      "teams/by-user-and-auction",
      payload
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        throw new Error("Endpoint not found");
      } else if (error.response.status === 400) {
        throw new Error("Bad request - invalid input data");
      } else if (error.response.status === 500) {
        throw new Error("Server error");
      }
    }
    throw new Error("An unexpected error occurred");
  }
};
