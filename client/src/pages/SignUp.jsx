import React, { useState } from 'react';
import rightArr from "../assets/Vector.svg";
import heroImg from "../assets/image 1.png";
import googleImage from "../assets/Vector (4).svg";
import dsgnElem from "../assets/IPL_Auction_SIGN_UP__2_-removebg-preview 1.svg";
import {useNavigate} from "react-router-dom"
import toast from 'react-hot-toast';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading , setLoading] = useState(false);
    const navigate  = useNavigate();

    async function registerUser(data){
        setLoading(true);
        console.log("data is : " , data);
        
        try {
          let url = "http://127.0.0.1:8787/api/users/register";
          const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          });
          const finalRes = await response.json();
    
          if(finalRes.error == "P2002"){
            toast.error("User already registered");
            setLoading(false);
            return;
          }
    
          if(finalRes.status == 411){
            toast.error("invalid inputs");
            setLoading(false);
            return;
          }
    
          if(finalRes.status === 201){
            console.log(finalRes);
            //dispatch(signupSuccess(finalRes.user));
            localStorage.setItem("userId" , finalRes.user.userId)
            toast.success("submitted successfully")
            return navigate("/login")
          }
          else{
            //dispatch(authFailure("signup failed"));
            toast.error("Some error occured")
          }
    
          setLoading(false);
    
        } catch (error) {
          //dispatch(authFailure("signup failed"));
          console.log("some error occured" , error);
          toast.error("Some error occured");
          setLoading(false);
        }
      }

    const handleSignUp = () => {
        // Form validation
        if (!username || !email || !password || !confirmPassword) {
            setErrorMessage('All fields are required.');
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        // Additional validation for email format (basic)
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            setErrorMessage('Please enter a valid email address.');
            return;
        }

        setErrorMessage(''); // Clear any previous error message
        // Logic for handling sign up (API call or other)
        const userDetails = { username, email, password };
        registerUser(userDetails);
        console.log('User Details:', userDetails);
    };

    return (
        <div>
            {/* header */}
            <div className="w-full border-blue-500 h-[50px] flex items-center px-2 gap-2">
                <div className="border-green-500">
                    <img src={rightArr} alt="" className="w-[20px] h-[25px]" onClick={() => navigate(-1)}/>
                </div>
                <div className="text-center flex justify-center items-center font-bold text-[18px] border-red-500 w-[97%] text-[#1F41BB]">
                    Sign Up
                </div>
            </div>

            {/* hero image */}
            <div className="relative w-full h-fit  border-blue-500">
                <img src={heroImg} alt="" className="w-full lg:h-[400px] object-fill" />
                <div className="absolute top-10 left-10 text-white font-semibold text-[20px] w-[80%] text-center">
                    Welcome aboard, Hop into the world of IPL Auctions.
                </div>
            </div>

            {/* form */}
            <div className="flex flex-col justify-center items-center mx-auto border-green-500 w-[90%] -mt-5 gap-5">
                <div className="flex flex-col gap-5 w-[95%]">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border border-black rounded-lg h-[45px] bg-white z-10 px-3"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-black rounded-lg h-[45px] bg-white z-10 px-3"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-black rounded-lg h-[45px] bg-white z-10 px-3"
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="border border-black rounded-lg h-[45px] bg-white z-10 px-3"
                    />
                </div>

                {errorMessage && (
                    <div className="text-red-500 font-semibold text-[14px] mb-2">
                        {errorMessage}
                    </div>
                )}

                <button
                    onClick={handleSignUp}
                    className="w-[95%] bg-[#1F41BB] text-white py-3 rounded-lg font-semibold text-[18px]"
                >
                    Sign Up
                </button>

                <span className="mr-2 font-semibold text-[14px] flex gap-2">
                    <span>Already Signed Up ? </span>
                    <span className="text-[#1F41BB]" onClick={()=>{return navigate("/login")}}>Log In</span>
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

export default SignUp;
