import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import bellIcon from "../assets/bellIcon.svg";
import rightArr from "../assets/rightArrWhite.svg";
import heroImg from "../assets/image 1.png";
import { useParams } from 'react-router-dom';
import Header from '../components/Header';

const AuctionRegistration = () => {
    const { username, token, userId } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const location = useLocation();
    const { auction } = location.state; // Auction details passed from AuctionDetail page
    const { id } = useParams(); // Retrieve auction ID from URL

    const [teamName, setTeamName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [teamIcon, setTeamIcon] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        console.log("user id from reg page : ", userId)
    }, [])

    const handleFileChange = (e) => {
        setTeamIcon(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {


            const data = {

                auctionId: Number(auction.id),
                teamName: teamName,
                mobileNumber: mobileNumber,
                registrationFee: auction.registrationFee,
                token: token,
                ownerId: Number(userId),
            }

            let url = "http://127.0.0.1:8787/api/auctions/register-participant";
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
            const finalRes = await response.json();

            console.log("this is the data ", data)
            console.log("this is the final respnse : ", finalRes)
            return navigate("/successregister" , { state: { auction } })

        } catch (error) {
            console.error('Error during registration:', error);
            console.log(error.message)
            alert('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full">
            {/* <div className='w-full h-[65px] border border-black bg-[#1F41BB] flex justify-between items-center px-4'>
                <div>
                    <img src={rightArr} alt="" className="w-[20px] h-[25px]" onClick={() => navigate(-1)} />
                </div>
                <div className='font-medium text-[24px] text-white'>
                    Register in Auction
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
            <Header heading={"Auction Registration"}></Header>

            {/* Auction Image */}
            <div className='relative'>
                <img
                    src={heroImg || 'https://via.placeholder.com/600x300'}
                    alt={auction.title}
                    className="w-full h-40 object-cover mb-4"
                />
                <div className="absolute top-10 left-10 text-white font-semibold text-[20px] w-[80%] text-center">
                Join us at - 
                Afternoon Relax Auction
                </div>
            </div>

            {/* <h1 className="text-2xl font-bold mb-4">{auction.title}</h1> */}

            {/* Registration Form */}
            <div className=' border-green-500 w-[90%] mx-auto mt-10'>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Team Name Input */}
                    <div>
                        {/* <label className="block text-sm font-medium text-gray-700 mb-1">Team Name</label> */}
                        <input
                            type="text"
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                            className="w-full px-4 h-[60px] border-2 border-[#1F41BB] rounded-lg text-xl mt-3"
                            placeholder="Enter your team name"
                            required
                        />
                    </div>

                    {/* Mobile Number Input */}
                    <div>

                        <input
                            type="text"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            className="w-full px-4 h-[60px] border-2 border-[#1F41BB] rounded-lg text-xl mt-3"
                            placeholder="Enter your mobile number"
                            required
                        />
                    </div>

                    {/* Team Icon Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 text-[20px] mt-3">Select Team Icon</label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="w-full"
                            required
                        />
                    </div>

                    {/* Registration Fee Display */}
                    <div>
                        
                        <div className="w-full bg-gray-100  border-gray-300 rounded-md flex justify-between items-center mt-10">
                            <div className='flex flex-col'>
                                <span className='font-bold text-[15px] text-neutral-400'>Total</span>
                                <span className='font-semibold text-[20px]'>Rs. {auction.registrationFee}</span>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className={`w-[60%] px-4 py-3 text-xl bg-blue-600 text-white rounded-md font-medium ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Submitting...' : 'Continue to Pay'}
                            </button>
                        </div>
                    </div>


                </form>
            </div>
        </div>
    );
};

export default AuctionRegistration;
