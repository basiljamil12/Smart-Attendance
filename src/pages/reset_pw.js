import StudentNavbar from "../components/navbars/student_navbar";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { FileUpload } from "primereact/fileupload";
import Toast from "../components/toast/toast";
import FacultyValidateTokenManager from "../models/faculty/auth/http/validate_token_http";
import StudentValidateTokenManager from "../models/student/auth/http/get_student_token_validation";
import ParentValidateTokenManager from "../models/parent/auth/http/validate_parent_token";
import ResetFacultyPassManager from "../models/faculty/auth/http/resetpasshttp";
import Spinner from "../components/spinner/spinner";
function ResetPassword() {
  const facValidToken = new FacultyValidateTokenManager();
  const studentValidToken = new StudentValidateTokenManager();
  const parentValidToken = new ParentValidateTokenManager();
  const resetFacultyPassManager = new ResetFacultyPassManager();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const studentToken = searchParams.get("studentToken");
  const parentToken = searchParams.get("parentToken");
  const facultyToken = searchParams.get("facultyToken");
  const [toastMessages, setToastMessages] = useState([]);

  // const  pathname  = useLocation();
  const [showLoading, setShowLoading] = useState(true);
  const [showPage, setShowPage] = useState(false);

  const pathname = window.location.pathname;

  const navigate = useNavigate();
  useEffect(() => {
    if (pathname.includes('/student/') && !studentToken) {
      navigate("/student/login");
    } else if (pathname.includes('/parent/') && !parentToken) {
      navigate("/parent/login");
    } else if (pathname.includes('/faculty/') && !facultyToken) {
      navigate("/faculty/login");
    }
  }, [pathname, studentToken, parentToken, facultyToken, navigate]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (pathname.includes('/student/') && studentToken) {
          // Code for student logic
          try {
            const response = await studentValidToken.getStudentValidation(studentToken);
            if (response.success) {
              setShowPage(true);
            } else {
              setToastMessages([...toastMessages, {
                type: "invalid",
                title: "Error",
                body: response.message,
              }]);
            }
          } catch (response) {
            setToastMessages([...toastMessages, {
              type: "invalid",
              title: "Error",
              body: response.message,
            }]);
          }
        } else if (pathname.includes('/parent/') && parentToken) {
          // Code for parent logic
          try {
            const response = await parentValidToken.getParentValidation(parentToken);
            if (response.success) {
              setShowPage(true);
            } else {
              setToastMessages([...toastMessages, {
                type: "invalid",
                title: "Error",
                body: response.message,
              }]);
            }
          } catch (response) {
            setToastMessages([...toastMessages, {
              type: "invalid",
              title: "Error",
              body: response.message,
            }]);
          }
        }
        else if (pathname.includes('/faculty/') && facultyToken) {
          // Assuming facValidToken.getValidation is an asynchronous function
          try {
            const response = await facValidToken.getFacultyValidation(facultyToken);
            if (response.success) {
              setShowPage(true);
            } else {
              setToastMessages([...toastMessages, {
                type: "invalid",
                title: "Error",
                body: response.message,
              }]);
            }
          } catch (response) {
            setToastMessages([...toastMessages, {
              type: "invalid",
              title: "Error",
              body: response.message,
            }]);
          }
        }
      } catch (error) {
        setToastMessages([...toastMessages, {
          type: "invalid",
          title: "Error",
          body: error.message,
        }]);
      }
      finally {
        setShowLoading(false);
      }
    };

    fetchData();

  }, [pathname, studentToken, parentToken, facultyToken, navigate, facValidToken,]);

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

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };



  const handleReset =async () => {

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
   
      if (pathname.includes('/student/') && studentToken) {
        try{

          navigate("/student/login");
        }
        catch{

        }
      }
      if (pathname.includes('/parent/') && parentToken) {
        try{
          navigate("/parent/login");
        }
        catch{
          
        }
      }
      if (pathname.includes('/faculty/') && facultyToken) {
        setShowLoading(true);
        try{
          const response = await resetFacultyPassManager.reset(facultyToken,confirmPassword);
          if(response.success){
            const updatedToastMessages = [
              ...toastMessages,
              {
                  type: "success",
                  title: "Success",
                  body: response.message,
              },
          ];
            setToastMessages(updatedToastMessages);
        navigate("/faculty/login", { state: { toastMessages: updatedToastMessages } });
          }

        }
        catch{
          
        }
        finally{
          setShowLoading(false);
        }
        
      }
      
   
  };

  return (
    <>
      {showLoading && (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center ">
          <Spinner />
        </div>
      )}
      {showPage && (
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
            {showLoading ? <Spinner /> : 'Reset'}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Show spinner if loading */}
    </>
  );
}

export default ResetPassword;
