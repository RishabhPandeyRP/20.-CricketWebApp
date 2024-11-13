// import { useParams } from 'react-router-dom';
// const ResetPassword = ()=>{
//     const { token } = useParams();

//     return(
//         <div className="w-full h-full flex flex-col justify-center items-center gap-7">
//             <span>
//                 {token}
//             </span>
//             <input type="password" className="border border-blue-500 w-[60%] h-[60px]"/>

//             <button className="w-[60%] rounded-lg py-3 bg-blue-400 text-white">Reset</button>
//         </div>
//     )
// }

// export default ResetPassword;



import React, { useEffect, useState } from 'react';
import rightArr from "../assets/Vector.svg";
import heroImg from "../assets/image 1.png";
import { useParams } from 'react-router-dom';
import dsgnElem from "../assets/IPL_Auction_SIGN_UP__2_-removebg-preview 1.svg";
import { useNavigate } from "react-router-dom"
import toast from 'react-hot-toast';

const ResetPassword = () => {
    // const [username, setUsername] = useState('');
    const { token, email } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("from reset page : ", token, email)
    })

    async function ChangePasswordCall(data) {
        setLoading(true);
        //console.log("data is : " , data);

        try {
            let url = "https://server.rishabh17704.workers.dev/api/resetPass";
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
            const finalRes = await response.json();

            if (finalRes.error == "P2002") {
                toast.error("User already registered");
                setLoading(false);
                return;
            }

            if (finalRes.status == 411) {
                toast.error("invalid inputs");
                setLoading(false);
                return;
            }

            if (finalRes.status === 201) {
                console.log("New password ", finalRes.user.password);
                //dispatch(signupSuccess(finalRes.user));
                //localStorage.setItem("userId" , finalRes.user.userId)
                toast.success("Password Changed Successfully")
                //return navigate("/login")
            }
            else {
                //dispatch(authFailure("signup failed"));
                toast.error("Some error occured")
            }

            setLoading(false);

        } catch (error) {
            //dispatch(authFailure("signup failed"));
            console.log("some error occured", error);
            toast.error(error.message);
            setLoading(false);
        }
    }

    const handleSignUp = () => {
        // Form validation
        if (!password || !confirmPassword) {
            setErrorMessage('All fields are required.');
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }


        setErrorMessage(''); // Clear any previous error message
        // Logic for handling sign up (API call or other)
        const userDetails = { password, token, email };
        //registerUser(userDetails);
        //console.log('User Details:', userDetails);
        ChangePasswordCall(userDetails);
    };

    return (
        <div>
            {/* header */}
            <div className="w-full border-blue-500 h-[50px] flex items-center px-2 gap-2">
                <div className="border-green-500">
                    <img src={rightArr} alt="" className="w-[20px] h-[25px]" onClick={() => navigate(-1)} />
                </div>
                <div className="text-center flex justify-center items-center font-bold text-[18px] border-red-500 w-[97%] text-[#1F41BB]">
                    Reset Password
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
                {
                    loading ? <button
                        
                        className="w-[95%] bg-[#1F41BB] text-white py-3 rounded-lg font-semibold text-[18px] opacity-50"
                    >
                        Reset
                    </button> :
                        <button
                            onClick={handleSignUp}
                            className="w-[95%] bg-[#1F41BB] text-white py-3 rounded-lg font-semibold text-[18px]"
                        >
                            Reset
                        </button>
                }



            </div>

            <div>
                <img src={dsgnElem} alt="" />
            </div>
        </div>
    );
};

export default ResetPassword;
