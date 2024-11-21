import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import bellIcon from "../assets/bellIcon.svg";
import { useNavigate } from 'react-router-dom';
import rightArr from "../assets/rightArrWhite.svg";
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';


const AuctionDetail = () => {
    const navigate = useNavigate();
    const { username } = useSelector((state) => state.user);
    const { id } = useParams(); // Retrieve auction ID from URL
    const location = useLocation();
    const { auction } = location.state;

    // Fetch auction details from backend (replace with real data fetching logic)
    // const auction = {
    //     id,
    //     title: "Sample Auction",
    //     image: "https://via.placeholder.com/600x300",
    //     startTime: new Date().toLocaleString(),
    //     registrationFee: "$50",
    //     description: "This is a detailed description of the auction.",
    // };

    return (
        <div className="">
            {/* <div className='w-full h-[65px] border border-black bg-[#1F41BB] flex justify-between items-center px-4'>
                <div>
                    <img src={rightArr} alt="" className="w-[20px] h-[25px]" onClick={() => navigate(-1)} />
                </div>
                <div className='font-medium text-[24px] text-white'>
                    Upcoming Auction
                </div>

                <div className='flex justify-center items-center gap-6'>
                    <div>
                        <img src={bellIcon} alt="Notifications" />
                    </div>
                    <div className='border border-white w-[30px] h-[30px] rounded-full flex justify-center items-center text-white font-medium text-[16px]'>
                        <div>{username.split(" ")[0].split("")[0].toUpperCase()}</div>
                    </div>
                </div>
            </div> */}

            <Header heading={"Upcoming Auction"}></Header>

            <div className='p-4 '>
                <img src={"https://via.placeholder.com/600x300"} alt={auction.title} className="w-full h-64 object-cover rounded-lg" />
                <h1 className="text-[20px] font-bold mt-4 px-3">{auction.title}</h1>
                <p className="text-lg mt-2 text-gray-700 px-3"> <span className='font-bold text-[14px]'>Date-Time :</span> {new Date(auction.startTime).toLocaleString()}</p>
                <p className="text-lg mt-2 text-gray-700 px-3"> <span className='font-bold text-[14px]'>Min Duration Required : 2hr</span> </p>
                <p className="text-lg mt-2 text-gray-700 px-3"> <span className='font-bold text-[14px]'>Min Wallet Amount : 100 Cr</span> </p>
                <p className="text-lg mt-2 text-gray-700 px-3"> <span className='font-bold text-[14px]'>Registration Fee : </span> {auction.registrationFee}</p>
                <p className="text-base mt-4 text-gray-600 text-justify px-3">{auction.description} Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum numquam hic eius maxime sit eos architecto in iure, provident culpa sed quo voluptate nemo. Laboriosam obcaecati voluptate maxime vel cumque. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, neque, perferendis quo corporis explicabo nesciunt repellendus rerum ea amet beatae eaque at a quam quod reiciendis cupiditate quisquam odio! Ipsa cupiditate provident reiciendis libero eveniet nam, a quisquam sint culpa id exercitationem architecto rem ex ad non eaque aspernatur eligendi itaque dicta earum veritatis ab expedita fuga at! Ipsam, tempora.</p>
                <button className="mt-6 px-4 py-3 bg-[#1F41BB] text-white rounded-lg w-full font-medium text-[16px]" onClick={() => navigate(`/register/${id}`, { state: { auction } })}>
                    Register in Auction
                </button>

            </div>
        </div>
    );
};

export default AuctionDetail;
