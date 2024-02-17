import React, { useState, useEffect } from "react";
import Footer from "../../components/footer/footer";
import PlainNavbar from "../../components/navbars/plainbar";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import Spinner from "../../components/spinner/spinner";
import FacultyHttpManager from "../../models/faculty/auth/http/signinhttp";
import Toast from "../../components/toast/toast";
import { useNavigate } from "react-router-dom";

function FacultyLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const facultyhttpManager = new FacultyHttpManager();
  const [toastMessages, setToastMessages] = useState([]);
  const isValidEmail = (email) => {
    // Regular expression for validating email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
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
    const response = await facultyhttpManager.login(email, password);
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
         
           localStorage.setItem('facultyToken', `${userToken}`);
           localStorage.setItem('facultyEmail', email);
           localStorage.setItem('facultyName', name);
           navigate("/faculty/dashboard");

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
  return (
    <div className="flex flex-col min-h-[100vh]">
      <div>
        <PlainNavbar />
      </div>
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
      <div className="flex flex-col flex-grow justify-center items-center mt-10">
        <div className="text-sa-maroon text-[36px] md:text-[40px] font-bold mb-14">
          FACULTY LOGIN
        </div>
        <div className={"relative mb-6 text-black"}>
          <input
            type="email"
            class=" shadow-xl focus:outline-none focus:ring-0 focus:border-onclickfield peer m-0 block h-[45px] md:h-[56px] md:mr-44  md:w-[102%]  rounded-[20px] w-[245px]  border-[1px] border-solid border-black bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-black "
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
          />
        </div>

        <div class="relative mb-6 ">
          <input
            type={showPassword ? "text" : "password"}
            class="shadow-xl focus:outline-none focus:ring-0 focus:border-clue-purchase peer m-0 block h-[45px] md:h-[56px]   md:mr-44  md:w-[102%] w-[245px]  rounded-[20px] border-[1px] border-solid  border-black  bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-black"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
          />
          {showPassword ? (
            <VisibilityOutlinedIcon
              className="absolute text-sa-black md:top-[16px] top-[10px] right-[16px] md:right-[10px] cursor-pointer "
              onClick={toggleShowPassword}
            />
          ) : (
            <VisibilityOffOutlinedIcon
              className="absolute text-sa-black md:top-[16px] top-[10px] right-[16px] md:right-[10px] cursor-pointer "
              onClick={toggleShowPassword}
            />
          )}
        </div>
        <div class="relative mb-4 ">
          <button
            //className="mb-4 h-[45px] md:h-[56px] bg-sa-maroon rounded-[20px] md:w-[102%] w-[245px] md:mr-3  shadow-md mx-5 text-white font-bold text-[26px]"
            // class="transition-opacity hover:opacity-90 font-bold shadow-xl focus:outline-none focus:ring-0 bg-sa-maroon  focus:border-clue-purchase peer m-0 block h-[45px] md:h-[56px]   md:mr-72  md:w-[101.5%] w-[245px]  rounded-[20px]   bg-clip-padding px-3 py-2 text-base  leading-tight text-white text-[24px] md:text-[28px]"
            class="transition-opacity hover:opacity-90 font-bold shadow-xl focus:outline-none focus:ring-0 bg-sa-maroon  focus:border-clue-purchase peer m-0 block h-[45px] md:h-[56px]   md:mr-80 md:ml-2  md:w-[98%] w-[245px]  rounded-[20px]   bg-clip-padding px-3 py-2 text-base  leading-tight text-white text-[24px] md:text-[28px]"
            
            onClick={handleSignIn}
          >
            {showLoading ? <Spinner /> : 'Sign In'}
          </button>
        </div>
        <div>
          <p className="text-[14px] font-bold mb-20 text-sa-blue md:text-[14px] md:ml-[47%] w-60 md:w-72 ml-[98px]  text-clue-yellow  cursor-pointer">
            <a href="/account/reset-password" className="underline">
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
      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
}

export default FacultyLogin;
