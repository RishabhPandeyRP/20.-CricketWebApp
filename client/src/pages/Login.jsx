import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import rightArr from "../assets/Vector.svg";
import heroImg from "../assets/image 1.png";
import googleImage from "../assets/Vector (4).svg";
import dsgnElem from "../assets/IPL_Auction_SIGN_UP-removebg-preview 1 (1).svg";
import toast from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [loading , setLoading] = useState(false);
    const navigate = useNavigate();

    async function loginUser(data) {
        setLoading(true);
        console.log("data is : ", data);
    
        try {
          let url = "http://127.0.0.1:8787/api/user/login";
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
    
          if (finalRes.status == 400) {
            toast.error("Incorrect password");
            setLoading(false);
            return;
          }
    
          if (finalRes.status === 201) {
            console.log(finalRes);
            //dispatch(loginSuccess(finalRes.user.userId));
            localStorage.setItem("shopCoToken", finalRes.token)
            localStorage.setItem("userId", finalRes.user.userId)
            localStorage.setItem("email", finalRes.user.email)
            toast.success("loggedIn successfully")
            setLoading(false);
            return navigate("/")
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

    const validateForm = () => {
        let formErrors = {};
        if (!email) {
            formErrors.email = "Username or Email is required";
        }
        if (!password) {
            formErrors.password = "Password is required";
        } else if (password.length < 6) {
            formErrors.password = "Password should be at least 6 characters";
        }
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleLogin = () => {
        if (validateForm()) {
            const userDetails = { email, password };
            console.log("User Details:", userDetails);
            // Implement the login API call here
            loginUser(userDetails);
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="w-full h-[50px] flex items-center px-2 gap-2">
                <div className="cursor-pointer" onClick={() => navigate(-1)}>
                    <img src={rightArr} alt="Back" className="w-[20px] h-[25px]" />
                </div>
                <div className="text-center flex justify-center items-center font-bold text-[18px] w-[97%] text-[#1F41BB]">
                    LogIn
                </div>
            </div>

            {/* Hero Image */}
            <div className="relative w-full h-fit">
                <img src={heroImg} alt="Hero" className="w-full lg:h-[400px] object-fill" />
                <div className="absolute top-10 left-10 text-white font-semibold text-[20px] w-[80%] text-center">
                    Welcome chief you’ve been missed!
                </div>
            </div>

            {/* Form */}
            <div className="flex flex-col justify-center items-center mx-auto w-[90%] -mt-5 gap-5">
                <div className="flex flex-col gap-5 w-[95%]">
                    <input
                        type="text"
                        placeholder="Username or Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`border rounded-lg h-[45px] bg-white px-3 z-10 ${errors.email ? 'border-red-500' : 'border-black'}`}
                    />
                    {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`border rounded-lg h-[45px] bg-white px-3 ${errors.password ? 'border-red-500' : 'border-black'}`}
                    />
                    {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
                </div>

                <span className="self-end mr-2 text-[#1F41BB] font-semibold text-[14px]" onClick={() => navigate("/fpp")}>
                    Forgot your password?
                </span>
                <button onClick={handleLogin} className="w-[95%] bg-[#1F41BB] text-white py-3 rounded-lg font-semibold text-[18px]">
                    Sign in
                </button>
                <span className="mr-2 font-semibold text-[14px] flex gap-2">
                    <span>New to the game? </span>
                    <span className="text-[#1F41BB]" onClick={() => navigate("/signup")}>Sign Up</span>
                </span>
                <span className="mr-2 text-[#1F41BB] font-semibold text-[14px] flex gap-2">
                    <span>or continue with</span>
                </span>
                <div className="border p-2 rounded-md">
                    <img src={googleImage} alt="Google" className="w-[25px] h-[25px]" />
                </div>
            </div>
            <div>
                <img src={dsgnElem} alt="Design Element" />
            </div>
        </div>
    );
};

export default Login;
