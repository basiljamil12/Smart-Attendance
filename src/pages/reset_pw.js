import StudentNavbar from "../components/navbars/student_navbar";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation,useParams } from "react-router-dom";
import { FileUpload } from "primereact/fileupload";
import Toast from "../components/toast/toast";

function ResetPassword() {
  const location = useLocation();
  const urlParams = new URLSearchParams(window.location.search);
  const searchParams = new URLSearchParams(location.search);
  const studentToken = searchParams.get("studentToken");
  const student= searchParams.get("student");
  const parentToken = searchParams.get("parentToken");
  const parent = searchParams.get("parent");
  const facultyToken = searchParams.get("facultyToken");
  const faculty = searchParams.get("faculty");
  // const  pathname  = useLocation();
  const pathname = window.location.pathname;

  const navigate = useNavigate();
  useEffect(() => {

   
  
    if (pathname.includes('/student/') && !studentToken) {
      navigate("/student/login");
    }

  else if  (pathname.includes('/parent/') && !parentToken) {
    navigate("/parent/login");
  }
  
  else if  (pathname.includes('/faculty/') && !facultyToken) {
    navigate("/faculty/login");
  }
  }, [ navigate]);
  // const location = useLocation();
  // const [studentToken, setStudentToken] = useState(null);
  // const [parentToken, setParentToken] = useState(null);
  // const [facultyToken, setFacultyToken] = useState(null);

  // // Parse URL parameters
  // const searchParams = new URLSearchParams(location.search);
  // const studentTokenParam = searchParams.get("studentToken");
  // const parentTokenParam = searchParams.get("parentToken");
  // const facultyTokenParam = searchParams.get("facultyToken");

  // useEffect(() => {
  //   if (studentTokenParam) {
  //     setStudentToken(studentTokenParam);
  //   }
  //   if (parentTokenParam) {
  //     setParentToken(parentTokenParam);
  //   }
  //   if (facultyTokenParam) {
  //     setFacultyToken(facultyTokenParam);
  //   }
  // }, [studentTokenParam, parentTokenParam, facultyTokenParam]);

  // useEffect(() => {
  //   if (!studentToken && !parentToken && !facultyToken) {
  //     // Redirect to the appropriate login page based on URL parameters
  //     if (location.pathname === "/parent/reset-password") {
  //       navigate("/parent/login");
  //       return ;
  //     } else if (location.pathname === "/student/reset-password") {
  //       // If it's a student reset password link and no student token, redirect to student login
  //       navigate("/student/login");
  //       return ;
  //     } else if (location.pathname === "/faculty/reset-password") {
  //       // If it's a faculty reset password link and no faculty token, redirect to faculty login
  //       navigate("/faculty/login");
  //       return ;
  //     }
  //   }
  // }, [studentToken, parentToken, facultyToken, location]);
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
      setToastMessages([
        ...toastMessages,
        {
          type: "invalid",
          title: "Invalid Password",
          body: "Both password are required",
        },
      ]);
      return; // Prevent form submission
    }
    navigate("/student/login");
  };

  return (
    <div className="md:flex items-center justify-center">
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

export default ResetPassword;
