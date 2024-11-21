import bellIcon from "../assets/bellIcon.svg";
import rightArr from "../assets/rightArrWhite.svg";
import { useNavigate, useLocation } from 'react-router-dom';
import confetti from "../assets/Confetti.svg"
import { useSelector } from 'react-redux';
import Header from "../components/Header";

const SuccessRegister = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { username, token, userId } = useSelector((state) => state.user);
    const { auction } = location.state;

    return (
        <div className="w-full h-[100vh] flex flex-col  border-red-600 justify-between pb-3">
            {/* <div className='w-full h-[65px] border border-black bg-[#1F41BB] flex justify-between items-center px-4'>
                <div>
                    <img src={rightArr} alt="" className="w-[20px] h-[25px]" onClick={() => navigate(-1)} />
                </div>
                <div className='font-medium text-[16px] text-white'>
                    Successful Registration
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

            <Header heading={"Successful Registration"}></Header>
            <div className="h-fit w-full  border-green-500 mt-[5%] relative">

                <img src={confetti} alt="" className="" />

                <div className="flex flex-col w-fit mx-auto absolute  border-green-500 top-[40%] left-[6%]">
                    <span className="font-bold text-[40px] text-center">Woohoo!</span>
                    <p className="w-[340px] text-center text-[16px]">You have registered for the upcoming auction on <span className="font-medium">{new Date(auction.startTime).toLocaleString()}</span> successfully ✅. </p>
                </div>

            </div>

            <div className="w-full px-2">
                <button className="w-full bg-[#1F41BB] text-white py-3 rounded-lg text-xl">Continue</button>
            </div>
        </div>
    )
}

export default SuccessRegister;