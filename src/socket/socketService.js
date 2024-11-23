import { io } from "socket.io-client";

class SocketService {
  constructor() {
    this.socket = null;
    this.SOCKET_URL = "http://localhost:3009";
  }

  // ------------------------------------------------
  connect(token, auctionId) {
    console.log(token, auctionId, "params");
    if (this.socket?.connected) {
      console.log("Socket already connected");
      return Promise.resolve(this.socket);
    }

    console.log("Attempting socket connection...", { auctionId });

    return new Promise((resolve, reject) => {
      this.socket = io("http://localhost:3009", {
        auth: {
          token: token,
          "x-room-lobby": auctionId,
        },
        transports: ["websocket"],
        reconnection: true,
      });

      this.socket.on("connect", () => {
        console.log("Socket connected successfully!", {
          socketId: this.socket.id,
          auctionRoom: auctionId,
        });
        resolve(this.socket);
      });

      this.socket.on("connect_error", (error) => {
        console.error("Socket connection error:", error.message || error);
        reject(error);
      });

      this.socket.on("disconnect", (reason) => {
        console.warn("Socket disconnected:", reason);
      });
    });
  }

  // -----------------------------------------------------

  disconnect() {
    if (this.socket) {
      console.log("Disconnecting socket...");
      this.socket.disconnect();
      this.socket = null;
    }
  }

  emit(eventName, data = {}, callback = () => {}) {
    if (!this.socket?.connected) {
      console.warn(`Cannot emit event "${eventName}": Socket not connected.`);
      return;
    }
    console.log(`Emitting event "${eventName}"...`);

    // console.log(this.socket.emit, "thisss");

    this.socket.emit(eventName, data, (response) => {
      console.log(response, "res of emitter auction size");
      if (response?.success) {
        console.log(`Event "${eventName}" successfully handled by the server.`);
      } else {
        console.error(
          `Failed to handle event "${eventName}" on the server.`,
          response?.error
        );
      }
      callback(response);
    });
  }

  on(eventName, callback) {
    if (!this.socket) {
      console.warn(
        `Cannot listen for event "${eventName}": Socket not initialized.`
      );
      return;
    }
    console.log(`Listening for event "${eventName}"`);
    this.socket.on(eventName, callback);
  }

  // ------------------------------------------------

  emitGetRoomSize() {
    this.emit("getAuctionRoomSize");
  }

  emitGetActivePlayer() {
    console.log("Emitting getActive player....");
    this.socket.emit("getActivePlayer");
    // this.socket.on("activePlayerDetail", (playerData) => {
    //   console.log("Active Player Data:", playerData);
    //   return playerData;
    // });
  }

  emitGetPlayerCount() {
    console.log("Emitting getPlayerCount");
    this.emit("playerCount");
  }

  // --------------------------------------------------

  onNewUserConnected() {
    this.on("newUserConnected", () => {
      console.log("New user connected................");
      this.emitGetRoomSize();
    });
  }

  onUserDisconnected() {
    this.on("userDisconnected", () => {
      console.log("User disconnected:");
      this.emitGetRoomSize();
    });
  }

  // -----------------------

  emitBid(auctionPlayerId, biddingAmount) {
    console.log("Emitting bid:", { auctionPlayerId, biddingAmount });
    this.emit("bid", { auctionPlayerId, biddingAmount });
  }

  onNewBid(callback) {
    this.on("newBid", (data) => {
      console.log("Received new bid:", data);
      callback(data);
    });
  }

  // -----------------------------

  onError(callback) {
    this.on("error", (error) => {
      console.error("Socket error received:", error);
      callback(error);
    });
  }

  // ---------------------------

  onRoomSize(callback) {
    this.on("auctionRoomSize", (data) => {
      console.log("Received room size:", data);
      callback(data);
    });
  }

  onActivePlayer(callback) {
    this.on("activePlayerDetail", (data) => {
      console.log("Received active player details:", data);
      callback(data);
    });
  }

  onPlayerCount(callback) {
    this.on("playerCount", (data) => {
      console.log("Received player count:", data);
      callback(data);
    });
  }

  onAskNewPlayer(callback) {
    this.on("askNewPlayer", () => {
      console.log("Received request for a new player");
      this.emitGetActivePlayer();
      callback();
    });
  }

  // ----------------------------

  emitGetBudget() {
    console.log("Emitting getBudget....");
    this.socket.emit("getBudget");
  }

  onBudgetUpdate(callback) {
    console.log("Listening for onBudgetUpdate...");
    this.socket.on("budgetUpdate", callback);
  }

  // --------------------------------

  isConnected() {
    return !!this.socket?.connected;
  }
}

export default new SocketService();
