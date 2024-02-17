import React, { useState, useEffect } from "react";
import Footer from "../../components/footer/footer";
import PlainNavbar from "../../components/navbars/plainbar";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useNavigate } from "react-router-dom";
import Toast from "../../components/toast/toast";
import StudentHttpManager from "../../models/student/auth/http/signinhttp";
import Spinner from "../../components/spinner/spinner";
import Reset_mail from "../../components/resetpass/reset_mail";
function StudentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [toastMessages, setToastMessages] = useState([]);
  const studenthttpManager = new StudentHttpManager();

  const isValidEmail = (email) => {
    // Regular expression for validating email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSignIn =async () => {
    try {
      setShowLoading(true);
    if(!email.trim()) {
      // If subject is empty or contains only whitespace
      setToastMessages([
        ...toastMessages,
        {
          type: "invalid",
          title: "Invalid Email",
          body: "Email cannot be empty",
        },
      ]);

      return; // Prevent form submission
    }
    if (!isValidEmail(email)) {
      setToastMessages([
        ...toastMessages,
        {
          type: "invalid",
          title: "Invalid Email",
          body: "Enter valid email address",
        },
      ]);
      return;
    }
    if (!password.trim()) {
      // If subject is empty or contains only whitespace
      setToastMessages([
        ...toastMessages,
        {
          type: "invalid",
          title: "Invalid Email",
          body: "Password cannot be empty",
        },
      ]);
      return; // Prevent form submission
    }
    const response = await studenthttpManager.login(email, password);
      if(response.success){
      handleSignInResponse(response);}
      else{
        handleSignInError(response.message);
      }
    } catch (error) {
      
      handleSignInError("Enter valid email and password");
    }
    finally {
      setShowLoading(false); // Stop loading
    }
  };
  const handleSignInResponse = (response) => {
    setShowLoading(false);

   if (!response.error) {
     const baseResponse = response.success;

     if (baseResponse === true) {
       const userToken = response.data.token;
       const email = response.data.email;
       const name = response.data.name;
       //const isEmailSubscribed = response.data.is_email_subscribed;

       if (userToken != null) {
         
           localStorage.setItem('studentToken', `${userToken}`);
           localStorage.setItem('studentEmail', email);
           localStorage.setItem('studentName', name);
           navigate("/student/dashboard");

         } 
       } else {
         handleSignInError(response.message);
       }
     } else {
       handleSignInError(response.message);
     }
   };
 const handleSignInError = (errorMessage) => {
   setShowLoading(false);
   setToastMessages([
     ...toastMessages,
     {
       type: "invalid",
       title: "Error",
       body: errorMessage,
     },
   ]);
 };
  const handleForgotPassword = (e) => {
  //  /http://localhost:3000/api/v1/student/forgot-password
  };

  const [isForgot, setIsForgot] = useState(false);
  
  const closeIsForgot = () => {
    setIsForgot(false);
  };
  const openIsForgot = () => {
    setIsForgot(true);
  };
  const handleForgotPasswordLinkSend=async()=>{

      const response = await studenthttpManager.forgotpass(email);
        if (response.success) {
          navigate('/adboard/signin');
        } else {
          console.error("Invalid token", response);
        }

  }
  return (
    <div className="flex flex-col min-h-[100vh]">
      {toastMessages.map((toast, index) => (
        <Toast
          className="mb-0"
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
      <div>
        <PlainNavbar />
      </div>
      <div className="flex flex-col flex-grow justify-center items-center mt-10">
        <div className="text-sa-maroon text-[36px] md:text-[40px] font-bold mb-14">
          STUDENT LOGIN
        </div>
        <div className={"relative mb-6 text-black"}>
          <input
            type="email"
            class=" shadow-xl focus:outline-none focus:ring-0 focus:border-sa-maroon  peer m-0 block h-[45px] md:h-[56px] md:mr-44  md:w-[102%]  rounded-[20px] w-[245px]  border-[1px] border-solid border-black bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-black "
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
          />
        </div>

        <div class="relative mb-6 ">
          <input
            type={showPassword ? "text" : "password"}
            class="shadow-xl focus:outline-none focus:ring-0 focus:border-sa-maroon peer m-0 block h-[45px] md:h-[56px]   md:mr-44  md:w-[102%] w-[245px]  rounded-[20px] border-[1px] border-solid  border-black  bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-black"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
          />
          {showPassword ? (
            <VisibilityOutlinedIcon
              className="absolute md:top-[16px] top-[10px] right-[16px] md:right-[10px] cursor-pointer text-sa-black"
              onClick={toggleShowPassword}
            />
          ) : (
            <VisibilityOffOutlinedIcon
              className="absolute md:top-[16px] top-[10px] right-[16px] md:right-[10px] cursor-pointer text-sa-black"
              onClick={toggleShowPassword}
            />
          )}
        </div>
        <div class="relative mb-4 ">
          <button
            //className="mb-4 h-[45px] md:h-[56px] bg-sa-maroon rounded-[20px] md:w-[102%] w-[245px] md:mr-3  shadow-md mx-5 text-white font-bold text-[26px]"
            class="transition-opacity hover:opacity-90 font-bold shadow-xl focus:outline-none focus:ring-0 bg-sa-maroon  focus:border-clue-purchase peer m-0 block h-[45px] md:h-[56px]   md:mr-80 md:ml-2  md:w-[98%] w-[245px]  rounded-[20px]   bg-clip-padding px-3 py-2 text-base  leading-tight text-white text-[24px] md:text-[28px]"
            onClick={handleSignIn}
          >
            {showLoading ? <Spinner /> : 'Sign In'}
          </button>
        </div>
        <div>
          <p className="text-[14px] font-bold mb-20 text-sa-blue md:text-[14px] md:ml-[47%] w-60 md:w-72 ml-[98px]  text-clue-yellow  cursor-pointer">
            <a className="underline"
            onClick={openIsForgot}
            >
              Forgot Password?
            </a>
          </p>
        </div>

        {/* <div className="w-72 shadow-xl h-96 rounded-3xl mx-10 md:my-0 my-10">
          <div>
            <img src={Teacher} />
          </div>
          <div className="pt-3">
            <button className="bg-sa-maroon rounded-xl w-48 h-12 shadow-md mx-5">
              <span className="text-white font-bold text-xl">
                Go To Faculty
              </span>
            </button>
          </div>
                     </div> */}
      </div>
      {isForgot && (
          <div
            className=" fixed inset-0 flex items-center justify-center z-50"
            onClick={closeIsForgot}
          >
            <div className=" bg-black opacity-50 absolute inset-0"></div>
            {/* <div
              className=" bg-white rounded-3xl md:w-auto w-80  p-8 px-12 relative z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-black font-semibold md:w-auto w-60 text-left mb-4">
                Confirm
              </h2>
              <p className="text-black text-filter-heading md:w-auto w-60 text-left">
               A link will be sent to your email to reset your password.<br></br>
               Are you sure you want to send?
              </p>
              <div className="flex justify-end mt-6">
                <button
                  onClick={closeIsForgot}
                  className="text-filter-heading transition-opacity hover:opacity-70 mr-4 border-2 border-gray-400 rounded-[9px] border-filter-heading py-1 px-6"
                >
                  Cancel
                </button>
                <button className="bg-sa-maroon transition-opacity hover:opacity-70 text-white md:px-7 px-5 rounded-[9px] py-1 "
                onClick={handleForgotPasswordLinkSend}>
                
                Send
                </button>
              </div>
            </div> */}
            <Reset_mail closePopup={closeIsForgot}/>
          </div>
        )}
      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
}

export default StudentLogin;
