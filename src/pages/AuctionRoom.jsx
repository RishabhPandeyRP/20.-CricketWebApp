import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:8787'; // Replace with your backend URL
const WEBSOCKET_URL = 'ws://localhost:8787'; // Replace with your WebSocket URL

const AuctionRoom = () => {
  const [auctionId, setAuctionId] = useState('');
  const [userId, setUserId] = useState('');
  const [websocket, setWebsocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [bidAmount, setBidAmount] = useState('');

  // Connect to WebSocket when auctionId is set
  useEffect(() => {
    if (auctionId && userId) {
      const ws = new WebSocket(`${WEBSOCKET_URL}/ws/auction/${auctionId}`);
      setWebsocket(ws);
  
      ws.onopen = () => {
        console.log('WebSocket connection opened');
      };
  
      ws.onmessage = (event) => {
        console.log('Message from server:', event.data);
        const data = JSON.parse(event.data);
        setMessages((prev) => [...prev, data]);
      };
  
      ws.onclose = () => {
        console.log('WebSocket connection closed');
      };
  
      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
  
      return () => ws.close();
    }
  }, [auctionId, userId]);
  

//   const joinAuction = () => {
//     if (websocket) {
//       websocket.send(JSON.stringify({ type: 'join', userId }));
//     }
//   };

//   const startAuction = () => {
//     if (websocket) {
//       websocket.send(JSON.stringify({ type: 'startAuction', userId }));
//     }
//   };

//   const placeBid = () => {
//     if (websocket && bidAmount) {
//       websocket.send(
//         JSON.stringify({ type: 'placeBid', userId, bidAmount: parseInt(bidAmount, 10) })
//       );
//     }
//   };

const sendMessage = (message) => {
    if (websocket && websocket.readyState === WebSocket.OPEN) {
      console.log('Sending message:', message);
      websocket.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not open');
    }
  };
  
  const joinAuction = () => {
    sendMessage({ type: 'join', userId });
  };
  
  const startAuction = () => {
    sendMessage({ type: 'startAuction', userId });
  };
  
  const placeBid = () => {
    sendMessage({ type: 'placeBid', userId, bidAmount: parseInt(bidAmount, 10) });
  };
  

  return (
    <div>
      <h1>Auction System</h1>

      <h2>Enter Auction Details</h2>
      <input
        type="text"
        placeholder="Auction ID"
        value={auctionId}
        onChange={(e) => setAuctionId(e.target.value)}
      />
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={joinAuction}>Join Auction</button>
      <button onClick={startAuction}>Start Auction</button>

      <h2>Place Bid</h2>
      <input
        type="number"
        placeholder="Bid Amount"
        value={bidAmount}
        onChange={(e) => setBidAmount(e.target.value)}
      />
      <button onClick={placeBid}>Place Bid</button>

      <h2>Messages</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{JSON.stringify(msg)}</li>
        ))}
      </ul>
    </div>
  );
};

export default AuctionRoom;
