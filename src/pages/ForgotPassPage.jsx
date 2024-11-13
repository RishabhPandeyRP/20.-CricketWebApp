import React, { useState, useEffect } from 'react';
import rightArr from "../assets/Vector.svg";
import heroImg from "../assets/image 1.png";
import googleImage from "../assets/Vector (4).svg";
import dsgnElem from "../assets/IPL_Auction_SIGN_UP__1_-removebg-preview 1.svg";
import {useNavigate} from "react-router-dom"
import toast from 'react-hot-toast';

const ForgotPassPage = () => {
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [email , setEmail] = useState('');
    const [timer, setTimer] = useState(0);
    const [loading , setLoading] = useState(false);
    const navigate = useNavigate();

    // Effect to handle the timer countdown
    useEffect(() => {
        if (isButtonDisabled && timer > 0) {
            const interval = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);

            return () => clearInterval(interval);
        } else if (timer === 0 && isButtonDisabled) {
            setIsButtonDisabled(false);
        }
    }, [isButtonDisabled, timer]);

    async function SendMail(data) {
        setLoading(true);
        console.log("data is : ", data);
    
        try {
          let url = "https://server.rishabh17704.workers.dev/api/resetLink";
          const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          });
          const finalRes = await response.json();
    
          if (finalRes.status == 411) {
            toast.error("invalid inputs");
            setLoading(false);
            return;
          }
    
          if (finalRes.status == 404) {
            toast.error("user not found");
            setLoading(false);
            return;
          }
    
        //   if (finalRes.status == 400) {
        //     toast.error("Incorrect password");
        //     setLoading(false);
        //     return;
        //   }
    
          if (finalRes.status === 201) {
            console.log(finalRes.link);
            //dispatch(loginSuccess(finalRes.user.userId));
            // localStorage.setItem("shopCoToken", finalRes.token)
            // localStorage.setItem("userId", finalRes.user.userId)
            // localStorage.setItem("email", finalRes.user.email)
            toast.success("mail sent successfully")
            setLoading(false);
            // return navigate("/")
          }
          else {
            //dispatch(authFailure("signup failed"));
            toast.error("Some error occured")
          }
    
          setLoading(false);
    
        } catch (error) {
          //dispatch(authFailure("signup failed"));
          console.log("some error occured", error);
          toast.error("Some error occured");
          setLoading(false);
        }
      }

    const handleResendClick = () => {
        setIsButtonDisabled(true);
        setTimer(120); // Start 2-minute timer (120 seconds)
        // Logic to resend the email goes here
        let data = {email}
        SendMail(data);
        console.log(email)
    };

    return (
        <div>
            {/* header */}
            <div className="w-full border-blue-500 h-[50px] flex items-center px-2 gap-2">
                <div className="border-green-500">
                    <img src={rightArr} alt="" className="w-[20px] h-[25px]" onClick={() => navigate(-1)}/>
                </div>
                <div className="text-center flex justify-center items-center font-bold text-[18px] border-red-500 w-[97%] text-[#1F41BB]">
                    Forget Password
                </div>
            </div>

            {/* hero image */}
            <div className="relative w-full h-fit  border-blue-500">
                <img src={heroImg} alt="" className="w-full lg:h-[400px] object-fill" />
                <div className="absolute top-10 left-10 text-white font-semibold text-[20px] w-[80%] text-center">
                    No issues, we got your back!
                </div>
            </div>

            {/* form */}
            <div className="flex flex-col justify-center items-center mx-auto border-green-500 w-[90%] -mt-5 gap-5">
                <div className="flex flex-col gap-5 w-[95%]">
                    <input type="email" 
                    placeholder="Email" 
                    className="border border-black rounded-lg h-[45px] bg-white z-10 px-3" 
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}/>
                </div>

                <button 
                    onClick={handleResendClick} 
                    className={`w-[95%] bg-[#1F41BB] text-white py-3 rounded-lg font-semibold text-[18px] ${isButtonDisabled ? 'opacity-50' : ''}`}
                    disabled={isButtonDisabled}
                >
                    {isButtonDisabled ? `Resend in ${timer}s` : 'Send Email'}
                </button>

                <span className="mr-2 font-semibold text-[14px] flex gap-2">
                    <span>New to the game? </span>
                    <span className="text-[#1F41BB]" onClick={()=>{return navigate("/signup")}}>Sign Up</span>
                </span>
                <span className="mr-2 text-[#1F41BB] font-semibold text-[14px] flex gap-2">
                    <span>or continue with</span>
                </span>
                <div className="border p-2 rounded-md">
                    <img src={googleImage} alt="" className="w-[25px] h-[25px]" />
                </div>
            </div>
            <div>
                <img src={dsgnElem} alt="" />
            </div>
        </div>
    );
};

export default ForgotPassPage;
