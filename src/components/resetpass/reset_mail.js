import React, { useState, useEffect } from 'react';
import '@fontsource/inter';
// Import the Verify_Code component
import { useNavigate, useLocation } from "react-router-dom";
import Toast from '../toast/toast';
import StudentHttpManager from "../../models/student/auth/http/signinhttp";
import WestIcon from "@mui/icons-material/West";
import ParentHttpManager from '../../models/parent/auth/http/signinhttp';
import FacultyHttpManager from '../../models/faculty/auth/http/signinhttp';
import Spinner from '../spinner/spinner';
function Reset_mail({ studentState, parentState, facultyState, closePopup,updateToastMessages }) {
    const studenthttpManager = new StudentHttpManager();
    const parenthttpManager = new ParentHttpManager();
    const facultyhttpManager = new FacultyHttpManager();
    const [showLoading, setShowLoading] = useState(false);

    const navigate = useNavigate();
    // useEffect(() => {

    //     const studentToken = localStorage.getItem('studentToken');

    //     if (studentToken) {
    //         // Use React Router's useHistory hook to navigate
    //         navigate('/student/dashboard');
    //     }


    // },);
    const [email, setEmail] = useState('');

    const location = useLocation();
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const [toastMessages, setToastMessages] = useState([]);
    const handleBackClick = () => {
        // Call closePopup function to close the popup
        closePopup();
    };
    const handleSendLink = async () => {
        // Perform any email verification logic here
        // If the email is valid, proceed to the verification step
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (!emailRegex.test(email)) {
            // Invalid email format, show an error message or take appropriate action

            setToastMessages([
                ...toastMessages,
                {
                    type: "invalid",
                    title: "Email",
                    body: "The Email is incorrect",
                },
            ]);

            return; // Do not proceed to the verification page
        }
        try {
            // Call the reset1 method from ResetPass class
            setShowLoading(true);
            let baseResponse;
            if (studentState) {
                baseResponse = await studenthttpManager.forgotpass(email);
            }
            else if (parentState) {
                baseResponse = await parenthttpManager.forgotpass(email);
            }
            else if (facultyState) {
                baseResponse = await facultyhttpManager.forgotpass(email);
            }

            if (baseResponse.success) {
                const newToastMessage = {
                    type: "success",
                    title: "Success",
                    body: baseResponse.message,
                  };
                  // Update the toast messages state by appending the new message
                  updateToastMessages(prevMessages => [...prevMessages, newToastMessage]);
                handleBackClick();
            }
            else{
                setToastMessages([
                    ...toastMessages,
                    {
                        type: "invalid",
                        title: "Error",
                        body: baseResponse.message,
                    },
                ]);
            }

        } catch (baseResponse) {
            setToastMessages([
                ...toastMessages,
                {
                    type: "invalid",
                    title: "Error",
                    body: baseResponse.message,
                },
            ]);
            
        }
        finally {
            setShowLoading(false); // Stop loading
          }
    };



    return (
        <div onClick={(e) => e.stopPropagation()}
            className=" bg-white z-10 rounded-[30px]  text-black flex flex-col justify-between">
            {toastMessages.map((toast, index) => (
                <Toast
                    key={index}
                    toasts={[toast]}
                    onClose={() => {
                        // Remove the toast message when it's closed
                        const updatedToasts = [...toastMessages];
                        updatedToasts.splice(index, 1);
                        setToastMessages(updatedToasts);
                    }}
                />
            ))}
            <div className="flex z-50  justify-center items-center ">
                <div className="mx-2  md:w-[460px] w-[320px] md:h-[200px] h-[250px] md:mb-[14vh] md:mt-[5vh] mt-5 block bg-clue-black">
                    <p className="md:mr-[117px] md:text-[24px] text-[22px] mr-[250px] md:w-[320px] w-[280px] md:mt-0 mt-10 md:mb-5 mb-5 font-[700] leading-tight text-sa-black">
                        <WestIcon className="text-clue-yellow mr-3 mb-1 cursor-pointer transition-opacity hover:opacity-70"
                            onClick={handleBackClick}
                        />Forgot Password
                    </p>

                    <div>
                        <p className=" md:mb-8 md:mt-0 mt-7 w-60 md:w-96 text-[17px] md:text-[20px] md:ml-[55px] text-left ml-[40px] font-[400] text-clue-gray leading-[1.30] text-lg">
                            Please enter your email that you used for your account
                        </p>
                        <div className={'relative md:mb-7 mb-5 md:mt-0 mt-7 '}>
                            <input
                                type="email"
                                class="focus:outline-none focus:ring-0 focus:border-sa-maroon peer m-0 block md:h-[56px] h-[45px] md:mx-14 md:w-[370px] mx-10 rounded-[10px] w-[245px] border-[1px] border-solid border-black bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-black"
                                id="email"
                                value={email}
                                onChange={handleEmailChange}
                                placeholder="Email"
                            />
                        </div>

                        <button
                            type="button"
                            className="mb-2 block md:mx-14 md:w-[370px] md:mt-9 mt-8 mx-10 md:h-[56px] h-[50px] w-[245px] bg-sa-maroon rounded-[10px]  text-center text-[19px] md:text-2xl font-[700] leading-normal text-white hover:scale-105 transition-all duration-300 ease-in-out hover:text-gray-300 hover:opacity-85"
                            onClick={handleSendLink}
                        >
            {showLoading ? <Spinner /> : 'Send Link'}
                           
                        </button>


                    </div>
                </div>
            </div>

        </div>
    );
}

export default Reset_mail;
