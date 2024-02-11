import StudentNavbar from "../../components/navbars/student_navbar";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FileUpload } from "primereact/fileupload";

function StudentResetPassword() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  console.log(token);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/student/login");
    }
  }, [token, navigate]);

//http://localhost:3000/api/v1/student/validate-reset-pass-token

  const [startDate1, setStartDate] = useState();
  const [endDate1, setEndDate] = useState();

  const handleStartChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndChange = (e) => {
    setEndDate(e.target.value);
  };

  const [startDate1Empty, setstartDate1Empty] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [toastMessages, setToastMessages] = useState([]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  

  const handleReset = () => {
   
    if (!password || !confirmPassword) {
      // If either start or end date is empty
      alert("Both password are required");
      return; // Prevent form submission
    }
    navigate("/student/login");
  };

  return (
    <div className="md:flex items-center justify-center">
    
      <div className="md:ml-14 ml-5 md:w-[50%] md:mx-0 mx-[6%] ">
      
        <p className="text-sa-maroon text-[36px] text-left md:mt-14 mt-10 font-bold">
          Reset Password
        </p>
        <div className="md:ml-3 ml-2 mt-12 md:mt-8 mb-5 ">
          
          <input
            type="text"
            id="newpass"
            placeholder="New Password"
            onChange={handlePasswordChange}
            value={password}
            className="placeholder-gray-500 w-full flex items-start justify-start  h-14 md:h-16 py-4  border-[1px] border-black border-solid   text-black p-2 rounded-xl focus:outline-none focus:ring-0 focus:border focus:border-sa-maroon
              
            "
          />
        </div>
        <div className="md:ml-3 ml-2 mt-5 md:mt-4 mb-10 ">
          
          <input
            type="text"
            id="confirmpass"
            placeholder="Confirm Password"
            onChange={handleConfirmPasswordChange}
            value={confirmPassword}
            className="placeholder-gray-500 w-full flex items-start justify-start  h-14 md:h-16 py-4  border-[1px] border-black border-solid   text-black p-2 rounded-xl focus:outline-none focus:ring-0 focus:border focus:border-sa-maroon 
           "   
            
          />
        </div>
     
   
     
        <div class="flex items-center justify-center  mb-14   ">
          <button
            //className="mb-4 h-[45px] md:h-[56px] bg-sa-maroon rounded-[20px] md:w-[102%] w-[245px] md:mr-3  shadow-md mx-5 text-white font-bold text-[26px]"
            class=" transition-opacity hover:opacity-90 font-bold shadow-xl focus:outline-none focus:ring-0 bg-sa-maroon  focus:border-sa-maroon peer m-0 block h-[55px] md:h-[56px]  md:w-[280px] w-[220px]  rounded-[20px]   bg-clip-padding px-3 py-2  leading-tight text-white text-[20px] md:text-[24px]"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentResetPassword;
