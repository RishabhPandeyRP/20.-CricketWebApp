// import bellIcon from "../assets/bellIcon.svg";
// import rightArr from "../assets/rightArrWhite.svg";
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { useState } from "react";

// const Header = ({heading})=>{
//     const navigate = useNavigate();
//     const location = useLocation();
//     const { username, token, userId } = useSelector((state) => state.user);
//     const { auction } = location.state;

//     // State for sidebar visibility
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//     // Toggle sidebar visibility
//     const toggleSidebar = () => {
//         setIsSidebarOpen((prev) => !prev);
//     };

//     return(
//         <div>
//             <div className='w-full h-[65px] border border-black bg-[#1F41BB] flex justify-between items-center px-4'>
//                 <div>
//                     <img src={rightArr} alt="" className="w-[20px] h-[25px]" onClick={() => navigate(-1)} />
//                 </div>
//                 <div className='font-medium text-[16px] text-white'>
//                     {heading}
//                 </div>

//                 <div className='flex justify-center items-center gap-6'>
//                     <div>
//                         <img src={bellIcon} alt="Notifications" />
//                     </div>
//                     <div className='border border-white w-[30px] h-[30px] rounded-full flex justify-center items-center text-white font-medium text-[16px]' onClick={toggleSidebar}>
//                         <div>{username.split(" ")[0].split("")[0].toUpperCase()}</div>
//                     </div>
//                 </div>
//             </div>

//             {/* Sidebar */}
//             {isSidebarOpen && (
//                 <div className="fixed top-0 right-0 w-[250px] h-full bg-[#1F41BB] shadow-lg z-50 flex flex-col text-white">
//                     {/* Close Button */}
//                     <div className="p-4 flex justify-end">
//                         <button
//                             className="text-white font-bold text-lg"
//                             onClick={toggleSidebar}
//                         >
//                             ✕
//                         </button>
//                     </div>

//                     {/* Sidebar Features */}
//                     <div className="flex flex-col gap-4 px-4">
//                         <div className="border-b border-gray-300 pb-2">
//                             <div className="text-lg font-semibold">Hello, {username.split(" ")[0]}</div>
//                             <div className="text-sm text-gray-200">Profile ID: {username}</div>
//                         </div>
//                         <button
//                             onClick={() => navigate('/profile')}
//                             className="w-full py-2 text-left hover:bg-blue-700 rounded-md px-2"
//                         >
//                             View Profile
//                         </button>
//                         <button
//                             onClick={() => navigate('/settings')}
//                             className="w-full py-2 text-left hover:bg-blue-700 rounded-md px-2"
//                         >
//                             Account Settings
//                         </button>
//                         <button
//                             onClick={() => navigate('/notifications')}
//                             className="w-full py-2 text-left hover:bg-blue-700 rounded-md px-2"
//                         >
//                             Notifications
//                         </button>
//                         <button
//                             onClick={() => {
//                                 // Clear user state and redirect to login
//                                 navigate('/logout');
//                             }}
//                             className="w-full py-2 text-left hover:bg-red-600 rounded-md px-2"
//                         >
//                             Logout
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     )
// }

// export default Header;

import { useEffect, useState } from "react";
import bellIcon from "../assets/bellIcon.svg";
import rightArr from "../assets/rightArrWhite.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import profile from "../assets/profile.svg";
import privacy from "../assets/privacy.svg";
import rules from "../assets/rules.svg";
import tnc from "../assets/t&c.svg";
import leftArr from "../assets/leftArr.png";
import whatsapp from "../assets/whatsapp.svg";
import user from "../assets/user (2).png";
import { Download } from 'lucide-react';


const Header = ({ heading }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = useSelector((state) => state.user);

  // State for sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div>
      {/* Header */}
      <div className="w-full h-[65px] border border-black bg-[#1F41BB] flex justify-between items-center px-4">
        <div>
          <img
            src={rightArr}
            alt="Back"
            className="w-[14px] h-[16px]"
            onClick={() => navigate(-1)}
          />
        </div>
        <div className="flex-1 font-medium text-lg text-start text-white pl-5">
          {heading}
        </div>

        <div className="flex justify-center items-center gap-6">
          {heading === "Results" && (
             <div className="flex justify-center">
             <Download size={22} className="text-white" />
           </div>
          )}
          <div>
            <img src={bellIcon} alt="Notifications" />
          </div>
          <div
            className="border border-white w-[30px] h-[30px] rounded-full flex justify-center items-center text-white font-medium text-[16px] cursor-pointer"
            onClick={toggleSidebar}
          >
            <div>{username.split(" ")[0].split("")[0].toUpperCase()}</div>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 "
          onClick={toggleSidebar} // Clicking on overlay closes the sidebar
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 flex flex-col  transition-transform duration-300 text-black ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-[100%]"
        }`}
        style={{ width: "300px" }}
      >
        {/* Close Button */}
        {/* <div className="p-4 flex justify-end">
                    <button
                        className=" font-bold text-lg"
                        onClick={toggleSidebar}
                    >
                        ✕
                    </button>
                </div> */}

        {/* Sidebar Features */}
        <div className="flex flex-col gap-4 px-0  border-green-500">
          <div className="border-b border-gray-300 px-3 py-4 bg-[rgb(31,65,187)] flex  items-center gap-5 justify-around">
            <div className="w-[50px] h-[50px] rounded-full border border-white justify-center items-center flex bg-white">
              <img src={user} alt="" className="w-[30px] h-[30px]" />
            </div>
            <div className="text-white">
              <div className="text-lg font-semibold">
                {" "}
                {username.split(" ")[0]}
              </div>
              <div className="text-sm ">Profile ID: {username}</div>
            </div>
            <div className="p-4 flex justify-end text-white">
              <button className=" font-bold text-lg" onClick={toggleSidebar}>
                ✕
              </button>
            </div>
          </div>
          <button
            onClick={() => navigate("/profile")}
            className="w-full py-2 text-left hover:bg-blue-700 rounded-md px-4"
          >
            <div className="flex justify-between items-center">
              <div className="flex justify-center items-center gap-5">
                <img src={profile} alt="" />
                <div>My Profile</div>
              </div>

              <div>
                <img src={leftArr} alt="" />
              </div>
            </div>
          </button>
          <button
            onClick={() => navigate("/refer")}
            className="w-full py-2 text-left hover:bg-blue-700 rounded-md px-4"
          >
            <div className="flex justify-between items-center">
              <div className="flex justify-center items-center gap-5">
                <img src={whatsapp} alt="" />
                <div>Refer and Earn</div>
              </div>
              <div>
                <img src={leftArr} alt="" />
              </div>
            </div>
          </button>
          <button
            onClick={() => navigate("/rules")}
            className="w-full py-2 text-left hover:bg-blue-700 rounded-md px-4"
          >
            <div className="flex justify-between items-center">
              <div className="flex justify-center items-center gap-5">
                <img src={rules} alt="" />
                <div>How to Play</div>
              </div>
              <div>
                <img src={leftArr} alt="" />
              </div>
            </div>
          </button>
          <button
            onClick={() => navigate("/tnc")}
            className="w-full py-2 text-left hover:bg-blue-700 rounded-md px-4"
          >
            <div className="flex justify-between items-center">
              <div className="flex justify-center items-center gap-5">
                <img src={tnc} alt="" />
                <div>Terms and Conditions</div>
              </div>
              <div>
                <img src={leftArr} alt="" />
              </div>
            </div>
          </button>
          <button
            onClick={() => navigate("/privacy")}
            className="w-full py-2 text-left hover:bg-blue-700 rounded-md px-4"
          >
            <div className="flex justify-between items-center">
              <div className="flex justify-center items-center gap-5">
                <img src={privacy} alt="" />
                <div>Privacy</div>
              </div>
              <div>
                <img src={leftArr} alt="" />
              </div>
            </div>
          </button>

          <p className="px-4 border-b-2 py-2">Test Pages</p>

          <button
            onClick={() => navigate("/bidhistory")}
            className="w-full py-2 text-left hover:bg-blue-700 rounded-md px-4"
          >
            <div className="flex justify-between items-center">
              <div className="flex justify-center items-center gap-5">
                <img src={privacy} alt="" />
                <div>Bid History</div>
              </div>
              <div>
                <img src={leftArr} alt="" />
              </div>
            </div>
          </button>
          <button
            onClick={() => navigate("/teampage")}
            className="w-full py-2 text-left hover:bg-blue-700 rounded-md px-4"
          >
            <div className="flex justify-between items-center">
              <div className="flex justify-center items-center gap-5">
                <img src={privacy} alt="" />
                <div>Teams</div>
              </div>
              <div>
                <img src={leftArr} alt="" />
              </div>
            </div>
          </button>
          <button
            onClick={() => navigate("/result")}
            className="w-full py-2 text-left hover:bg-blue-700 rounded-md px-4"
          >
            <div className="flex justify-between items-center">
              <div className="flex justify-center items-center gap-5">
                <img src={privacy} alt="" />
                <div>Results</div>
              </div>
              <div>
                <img src={leftArr} alt="" />
              </div>
            </div>
          </button>
          <button
            onClick={() => {
              // Clear user state and redirect to login
              navigate("/");
              localStorage.removeItem("shopCoToken")
            }}
            className="w-full py-2 text-left text-red-500    hover:bg-red-600 rounded-md px-4"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
