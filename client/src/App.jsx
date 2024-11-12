import React from 'react';
import LoginPage from './pages/Login';
import { Routes, Route } from 'react-router-dom'
import SignUp from './pages/SignUp';
import ForgotPassPage from './pages/ForgotPassPage';
import toast, { Toaster } from 'react-hot-toast';
import UnderConstruction from './pages/UnderConstruction';

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={<UnderConstruction></UnderConstruction>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/fpp" element={<ForgotPassPage />} />
      </Routes>
      <Toaster></Toaster>
    </div>
  );
}

export default App;
