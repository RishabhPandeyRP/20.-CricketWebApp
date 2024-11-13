import React from 'react';
import LoginPage from './pages/Login';
import { Routes, Route } from 'react-router-dom'
import SignUp from './pages/SignUp';
import ForgotPassPage from './pages/ForgotPassPage';
import toast, { Toaster } from 'react-hot-toast';
import UnderConstruction from './pages/UnderConstruction';
import ResetPassword from './pages/ResetPassword';
import Splash from './pages/Splash';

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={<UnderConstruction></UnderConstruction>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/fpp" element={<ForgotPassPage />} />
        <Route path="/resetpass/:email/:token" element={<ResetPassword></ResetPassword>} />
        <Route path="/splash" element={<Splash></Splash>} />
      </Routes>
      <Toaster></Toaster>
    </div>
  );
}

export default App;
