import React from 'react';
import LoginPage from './pages/Login';
import { Routes, Route } from 'react-router-dom'
import SignUp from './pages/SignUp';
import ForgotPassPage from './pages/ForgotPassPage';
import toast, { Toaster } from 'react-hot-toast';
import UnderConstruction from './pages/UnderConstruction';
import ResetPassword from './pages/ResetPassword';
import Splash from './pages/Splash';
import Home from './pages/Home';
import AuctionDetail from './pages/AuctionDetail';
import AuctionRegistration from './pages/AuctionRegistration';
import SuccessRegister from './pages/SuccessfulRegistration';
import MyProfile from './pages/MyProfile';
import AuctionHome from './pages/AuctionHome';

import AuctionRoom from './pages/AuctionRoom';
import BidHistory from './pages/BidHistory';

import Teams from './pages/TeamsPage';

import Auction from "./pages/AuctionRoom"

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path="/home" element={<Home></Home>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/fpp" element={<ForgotPassPage />} />
        <Route path="/resetpass/:email/:token" element={<ResetPassword/>} />
        <Route path="/" element={<Splash></Splash>} />

        <Route path="/auction/:id" element={<AuctionDetail />} />
        <Route path="/register/:id" element={<AuctionRegistration />} />
        <Route path="/successregister" element={<SuccessRegister/>} />

        <Route path="/auctionRoom/:auctionId" element={<AuctionRoom/>}/>
        
        <Route path="/profile" element={<MyProfile/>} />
        <Route path="/bidhistory" element={<BidHistory></BidHistory>} />
        <Route path="/teampage" element={<Teams></Teams>} />

        <Route path="/auctionHome" element={<AuctionHome />} />
        <Route path="/auction-room" element={<AuctionRoom />} />
      </Routes>
      <Toaster></Toaster>
    </div>
  );
}

export default App;
