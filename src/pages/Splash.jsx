import splashImg from "../assets/Rectangle 1.svg"
import { useNavigate } from "react-router-dom"

const Splash = () => {

    const navigate = useNavigate();

    return (
        <div className="w-full h-[100dvh] bg-[#050F40] flex flex-col justify-center items-center gap-3 py-4">
            <div className="-mt-3 border-white">
                <img src={splashImg} alt="" className=" border-white w-[590px] h-[590px] ml-5" />
            </div>
            <div className="flex flex-col gap-3  border-white justify-center items-center">
                <div className="font-bold text-[26px] text-center text-white w-[88%]">
                    Discover the Thrill of
                    Cricket Auction
                </div>
                <div className="text-[13px] text-center text-white w-[85%]">
                    Experience Cricket Auctions, auction updates, and exclusive
                    content from the Aucto Gaming.
                </div>
                <button className="w-[95%] bg-white text-[#050F40] py-3 rounded-3xl font-bold text-[18px]" onClick={()=>{return navigate("/signup")}}>
                    Get Started
                </button>
            </div>
        </div>
    )
}

export default Splash;