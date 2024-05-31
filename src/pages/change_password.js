import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { FileUpload } from "primereact/fileupload";
import Toast from "../components/toast/toast";
import FacultyValidateTokenManager from "../models/faculty/auth/http/validate_token_http";
import StudentValidateTokenManager from "../models/student/auth/http/get_student_token_validation";
import ParentValidateTokenManager from "../models/parent/auth/http/validate_parent_token";
import ResetFacultyPassManager from "../models/faculty/auth/http/resetpasshttp";
import Spinner from "../components/spinner/spinner";
import ResetParentPassManager from "../models/parent/auth/http/resetpasshttp";
import ChangeStudentPassManager from "../models/student/auth/http/change_password";
import ResetStudentPassManager from "../models/student/auth/http/resetpasshttp";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import StudentNavbar from "../components/navbars/student_navbar";
import FacultyNavbar from "../components/navbars/faculty_navbar";
import ParentNavbar from "../components/navbars/parent_navbar";
import ChangeFacultyPassManager from "../models/faculty/auth/http/change_password";
import ChangeParentPassManager from "../models/parent/auth/http/change_password";
function ChangePassword() {
  const changeParentPassManager = new ChangeParentPassManager();
  const changeStudentPassManager = new ChangeStudentPassManager();
  const changeFacultyPassManager = new ChangeFacultyPassManager();
  const parentToken = localStorage.getItem("parentToken");
  const studentToken = localStorage.getItem("studentToken");
  const facultyToken = localStorage.getItem("facultyToken");
  // const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);
  // const studentToken = searchParams.get("studentToken");
  // const parentToken = searchParams.get("parentToken");
  // const facultyToken = searchParams.get("facultyToken");
  const [toastMessages, setToastMessages] = useState([]);

  // const  pathname  = useLocation();
  const [showLoading, setShowLoading] = useState(false);
  const [showPage, setShowPage] = useState(false);

  const pathname = window.location.pathname;
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };
  const renderNavbar = () => {
    if (pathname.includes('student')) {
      return <StudentNavbar />;
    } else if (pathname.includes('faculty')) {
      return <FacultyNavbar />;
    } else if (pathname.includes('parent')) {
      return <ParentNavbar />;
    } else {
      return null; // Default case if none of the conditions match
    }
  };
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
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       if (pathname.includes('/student/')) {
  //         // Code for student logic
  //         try {
  //           const response = await studentValidToken.getStudentValidation(studentToken);
  //           if (response.success) {
  //             setShowPage(true);
  //           } else {
  //             setToastMessages([...toastMessages, {
  //               type: "invalid",
  //               title: "Error",
  //               body: response.message,
  //             }]);
  //           }
  //         } catch (response) {
  //           setToastMessages([...toastMessages, {
  //             type: "invalid",
  //             title: "Error",
  //             body: response.message,
  //           }]);
  //         }
  //       } else if (pathname.includes('/parent/') && parentToken) {
  //         // Code for parent logic
  //         try {
  //           const response = await parentValidToken.getParentValidation(parentToken);
  //           if (response.success) {
  //             setShowPage(true);
  //           } else {
  //             setToastMessages([...toastMessages, {
  //               type: "invalid",
  //               title: "Error",
  //               body: response.message,
  //             }]);
  //           }
  //         } catch (response) {
  //           setToastMessages([...toastMessages, {
  //             type: "invalid",
  //             title: "Error",
  //             body: response.message,
  //           }]);
  //         }
  //       }
  //       else if (pathname.includes('/faculty/') && facultyToken) {
  //         // Assuming facValidToken.getValidation is an asynchronous function
  //         try {
  //           const response = await facValidToken.getFacultyValidation(facultyToken);
  //           if (response.success) {
  //             setShowPage(true);
  //           } else {
  //             setToastMessages([...toastMessages, {
  //               type: "invalid",
  //               title: "Error",
  //               body: response.message,
  //             }]);
  //           }
  //         } catch (response) {
  //           setToastMessages([...toastMessages, {
  //             type: "invalid",
  //             title: "Error",
  //             body: response.message,
  //           }]);
  //         }
  //       }
  //     } catch (error) {
  //       setToastMessages([...toastMessages, {
  //         type: "invalid",
  //         title: "Error",
  //         body: error.message,
  //       }]);
  //     }
  //     finally {
  //       setShowLoading(false);
  //     }
  //   };

  //   fetchData();

  // }, [pathname, studentToken, parentToken, facultyToken, navigate, facValidToken,]);

  //http://localhost:3000/api/v1/student/validate-reset-pass-token

 
  const [oldPassword, setOldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  



  const handleReset = async () => {

    if (!oldPassword || !confirmPassword) {
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
    

    if (pathname.includes('/student/') ) {
      setShowLoading(true);
      try {
        const response = await changeStudentPassManager.change(oldPassword, confirmPassword);
        if (response.success) {
          // const updatedToastMessages = [
          //   ...toastMessages,
          //   {
          //     type: "success",
          //     title: "Success",
          //     body: response.message,
          //   },
          // ];
          // setToastMessages(updatedToastMessages);
          setToastMessages([
            ...toastMessages,
            {
              type: "success",
              title: "Success",
              body: response.message,
            },
          ]);
          setOldPassword("");
          setConfirmPassword("");
          // navigate("/student/login", { state: { toastMessages: updatedToastMessages } });
        }
        else {
          setToastMessages([
            ...toastMessages,
            {
              type: "invalid",
              title: "Error",
              body: response.message,
            },
          ]);
        }

      }
      catch (response) {
        setToastMessages([
          ...toastMessages,
          {
            type: "invalid",
            title: "Error",
            body: response.message,
          },
        ]);
      }
      finally {
        setShowLoading(false);
      }



    }
    else if (pathname.includes('/parent/') ) {
      setShowLoading(true);
      try {
        const response = await changeParentPassManager.change(oldPassword, confirmPassword);
        if (response.success) {
        setToastMessages([
      ...toastMessages,
      {
        type: "success",
        title: "Success",
        body: response.message,
      },
    ]);
    setOldPassword("");
    setConfirmPassword("");
        }
        else {
          setToastMessages([
            ...toastMessages,
            {
              type: "invalid",
              title: "Error",
              body: response.message,
            },
          ]);
        }

      }
      catch (response) {
        setToastMessages([
          ...toastMessages,
          {
            type: "invalid",
            title: "Error",
            body: response.message,
          },
        ]);
      }
      finally {
        setShowLoading(false);
      }



    }
    else if (pathname.includes('/faculty/')) {
      setShowLoading(true);
      try {
        const response = await changeFacultyPassManager.change(oldPassword, confirmPassword);
        if (response.success) {
          setToastMessages([
            ...toastMessages,
            {
              type: "success",
              title: "Success",
              body: response.message,
            },
          ]);
          setOldPassword("");
          setConfirmPassword("");
        }

        else {
          setToastMessages([
            ...toastMessages,
            {
              type: "invalid",
              title: "Error",
              body: response.message,
            },
          ]);
        }

      }
      catch (response) {
        setToastMessages([
          ...toastMessages,
          {
            type: "invalid",
            title: "Error",
            body: response.message,
          },
        ]);
      }
      finally {
        setShowLoading(false);
      }

    }


  };

  return (
    
    <>
    <div>
    {renderNavbar()}
      </div>
      {/* {showLoading && (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center ">
          <Spinner />
        </div>
      )} */}
      {/* {showPage && ( */}
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
              Change Password
            </p>
            <div class="relative md:ml-3 ml-2 mt-12 md:mt-8 ">
        <input
          type={showPassword ? "text" : "password"}
          //class="shadow-xl focus:outline-none focus:ring-0 focus:border-clue-purchase peer m-0 block h-[45px] md:h-[56px]   md:mr-44  md:w-[102%] w-[245px]  rounded-[20px] border-[1px] border-solid  border-black  bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-black"
          className="placeholder-gray-500 w-full flex items-start justify-start  h-14 md:h-16 py-4  border-[1px] border-black border-solid   text-black p-2 rounded-xl focus:outline-none focus:ring-0 focus:border focus:border-sa-maroon "
          
          id="password1"
          value={oldPassword}
          onChange={handlePasswordChange}
          placeholder="Old Password"
        />
        {showPassword ? (
          <VisibilityOutlinedIcon
            className="absolute text-sa-black md:top-[20px] top-[14px] right-[16px] md:right-[14px] cursor-pointer "
            onClick={toggleShowPassword}
          />
        ) : (
          <VisibilityOffOutlinedIcon
            className="absolute text-sa-black md:top-[20px] top-[14px] right-[16px] md:right-[14px] cursor-pointer "
            onClick={toggleShowPassword}
          />
        )}
      </div>
      <div class="relative md:ml-3 ml-2 mt-6 md:mt-6 mb-10 ">
        <input
          type={showPassword2 ? "text" : "password"}
          //class="shadow-xl focus:outline-none focus:ring-0 focus:border-clue-purchase peer m-0 block h-[45px] md:h-[56px]   md:mr-44  md:w-[102%] w-[245px]  rounded-[20px] border-[1px] border-solid  border-black  bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-black"
          className="placeholder-gray-500 w-full flex items-start justify-start  h-14 md:h-16 py-4  border-[1px] border-black border-solid   text-black p-2 rounded-xl focus:outline-none focus:ring-0 focus:border focus:border-sa-maroon "
          
          id="password2"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          placeholder="New Password"
        />
        {showPassword2 ? (
          <VisibilityOutlinedIcon
            className="absolute text-sa-black md:top-[20px] top-[14px] right-[16px] md:right-[14px] cursor-pointer "
            onClick={toggleShowPassword2}
          />
        ) : (
          <VisibilityOffOutlinedIcon
            className="absolute text-sa-black md:top-[20px] top-[14px] right-[16px] md:right-[14px] cursor-pointer "
            onClick={toggleShowPassword2}
          />
        )}
      </div>
           

            <div class="flex items-center justify-center  mb-14   ">
              <button
                //className="mb-4 h-[45px] md:h-[56px] bg-sa-maroon rounded-[20px] md:w-[102%] w-[245px] md:mr-3  shadow-md mx-5 text-white font-bold text-[26px]"
                class="hover:scale-105 transition-all duration-300 ease-in-out hover:text-gray-300 hover:opacity-90 font-bold shadow-xl focus:outline-none focus:ring-0 bg-sa-maroon  focus:border-sa-maroon peer m-0 block h-[55px] md:h-[56px]  md:w-[280px] w-[220px]  rounded-[20px]   bg-clip-padding px-3 py-2  leading-tight text-white text-[20px] md:text-[24px]"
                onClick={handleReset}
              >
                {showLoading ? <Spinner /> : 'Reset'}
              </button>
            </div>
          </div>
        </div>
      {/* )} */}
      {/* Show spinner if loading */}
    </>
  );
}

export default ChangePassword;
