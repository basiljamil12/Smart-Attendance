import StudentNavbar from "../../components/navbars/student_navbar";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FileUpload } from "primereact/fileupload";

function StudentChangePassword() {

  const navigate = useNavigate();

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
    <div>
    
      <div className="md:ml-14 ml-5 mx-[6%] ">
        <p className="text-sa-maroon text-[36px] text-left md:mt-8 mt-6 font-bold">
          Reset Password
        </p>
        <div className="md:ml-3 ml-2 mt-5 md:mt-4 mb-5 ">
          
          <input
            type="text"
            id="subject"
            placeholder="New Password"
            onChange={handlePasswordChange}
            value={password}
            className="placeholder-gray-500 w-full  h-14 md:h-16 py-4  border-[1px] border-black border-solid   text-black p-2 rounded-xl focus:outline-none focus:ring-0 focus:border focus:border-sa-maroon
              
            "
          />
        </div>
        <div className="md:ml-3 ml-2 mt-5 md:mt-4 mb-5 ">
          
          <input
            type="text"
            id="subject"
            placeholder="Confirm Password"
            onChange={handleConfirmPasswordChange}
            value={confirmPassword}
            className="placeholder-gray-500 w-full  h-14 md:h-16 py-4  border-[1px] border-black border-solid   text-black p-2 rounded-xl focus:outline-none focus:ring-0 focus:border focus:border-sa-maroon 
           "   
            
          />
        </div>
     
   
     
        <div class="flex items-center justify-center mb-14   ">
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

export default StudentChangePassword;
