import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import FacultySignoutManager from "../../models/faculty/auth/http/signouthttp";
import FacultyDetailsManager from "../../models/faculty/auth/http/getdetails";
import Spinner from "../spinner/spinner";
function FacultyNavbar() {
  const navigate = useNavigate();
  const facultySignoutManager = new FacultySignoutManager();
  const facultyDetailsManager = new FacultyDetailsManager();
  const [facultyData, setFacultyData] = useState(null);
  const [isStudentAdvisor, setIsStudentAdvisor] = useState(null);

  const [open, setOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [leaveMenuOpen, setLeaveMenuOpen] = useState(false);
  const [courseMenuOpen, setCourseMenuOpen] = useState(false);
  const [HomeMenuOpen, setHomeMenuOpen] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      // setShowLoading(true);
      try {
        const response = await facultyDetailsManager.get();
        if (response.success) {
          setFacultyData(response.data);
          setIsStudentAdvisor(response.data.isStudentAdvisor);
        } else {
          setToastMessages([
            ...toastMessages,
            {
              type: "invalid",
              title: "Error",
              body: response.message,
            },
          ]);
        }
      } catch (error) {
        setToastMessages([
          ...toastMessages,
          {
            type: "invalid",
            title: "Error",
            body: error.message,
          },
        ]);
      } finally {
        // setShowLoading(false);
      }
    };

    fetchData();
  }, []);
  
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768 && open) {
        setOpen(false);
      }
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [open]);
  const [toastMessages, setToastMessages] = useState(
    location.state?.toastMessages || []
  ); // S

  const [isSignout, setIsSignout] = useState(false);

  const closeSignOut = () => {
    setIsSignout(false);
  };
  const openSignOut = () => {
    setAccountMenuOpen(false);
    setOpen(false);
    setIsSignout(true);
  };
  const handleLeaveClick = () => {
    navigate("/faculty/leave");
    setOpen(false);
  };
  const handleSignout = async () => {
    setShowLoading(true);
try{
    const response = await facultySignoutManager.signout();
    if (response.success) {
      const updatedToastMessages = [
        ...toastMessages,
        {
          type: "success",
          title: "Success",
          body: response.message,
        },
      ];
      setToastMessages(updatedToastMessages);
      navigate("/faculty/login", {
        state: { toastMessages: updatedToastMessages },
      });
    } else {
      setToastMessages([
        ...toastMessages,
        {
          type: "invalid",
          title: "Error",
          body: response.message,
        },
      ]);
    }
  }catch(e){
    setToastMessages([
      ...toastMessages,
      {
        type: "invalid",
        title: "Error",
        body: e.message,
      },
    ]);
  }
  finally{
    setShowLoading(false);
  }
  };
  const toggleAccountMenu = () => {
    if (leaveMenuOpen == true) {
      setLeaveMenuOpen(false);
    }
   else if (courseMenuOpen==true){
    setCourseMenuOpen(false);
   }
    else if (accountMenuOpen == true) {
      return;
    }
    setAccountMenuOpen(!accountMenuOpen);
  };

  const toggleLeaveMenu = () => {
    if (accountMenuOpen == true) {
      setAccountMenuOpen(false);
    }
    else if(courseMenuOpen==true){
    setCourseMenuOpen(false);

    }
    if (leaveMenuOpen == true) {
      return;
    }
    setLeaveMenuOpen(!leaveMenuOpen);
  };

  const toggleCourseMenu = () => {
    if (leaveMenuOpen == true) {
      setLeaveMenuOpen(false);
    }
    else if (accountMenuOpen == true) {
      setAccountMenuOpen(false);
    }
    else if (courseMenuOpen == true) {
      return;
    }
    setCourseMenuOpen(!courseMenuOpen);
  };
  const toggleHomeMenu = () => {
    if (courseMenuOpen == true) {
      setCourseMenuOpen(false);
    }
    setHomeMenuOpen(!HomeMenuOpen);
  };
  const handleCourseRegisterClick = () => {
    // You can add your logic here
    setOpen(false);
    setCourseMenuOpen(false);
    navigate("/faculty/course/register");
  };
  const handleAssignCourseClick = () => {
    // You can add your logic here
    navigate("/faculty/course/assign");
    setCourseMenuOpen(false);
    setOpen(false);
  };
  const handleProfileClick = () => {
    // Handle click on Profile Information
    // You can add your logic here
    navigate("/faculty/account/information");
    setOpen(false);
    setAccountMenuOpen(false);
  };

  const handleChangePasswordClick = () => {
    // Handle click on Change Password
    // You can add your logic here
    navigate("/faculty/account/change-password");
    setOpen(false);
    setAccountMenuOpen(false);
  };

  // const handleSignoutClick = () => {
  //   // Handle click on Signout
  //   // You can add your logic here
  //   setAccountMenuOpen(false);
  // };
  const handleMouseLeave = () => {
    setOpen(false);
    setAccountMenuOpen(false);
    setLeaveMenuOpen(false);
    setCourseMenuOpen(false);
  };

  // const handleCourseClick = () => {
  //   // You can add your logic here
  //   setOpen(false);
  //   navigate("/faculty/course/register");
  // };

  const handleHomeClick = () => {
    // You can add your logic here
    setOpen(false);
    navigate("/faculty/dashboard");
  };

  return (
    <div className="bg-sa-maroon w-full h-24 flex items-center px-10 relative">
      <div className="flex justify-start w-full">
        <span
          className="text-xl md:text-3xl text-white font-bold hover:cursor-pointer"
          onClick={handleHomeClick}
        >
          Smart Attendance
        </span>
      </div>
      <div className="flex items-end">
        <div
          onClick={() => setOpen(!open)}
          className="text-clue-gray text-3xl absolute right-8 top-3 cursor-pointer md:hidden mt-3.5"
        >
          {open ? (
            <CloseIcon style={{ color: "white", fontSize: 30 }} />
          ) : (
            <MenuIcon style={{ color: "white", fontSize: 30 }} />
          )}
        </div>
        {open && (
          <div className="absolute top-full left-0 right-0 bg-sa-maroon z-10 pt-2 pb-4 px-4">
            <span
              onClick={handleHomeClick}
              className="transition-opacity hover:opacity-60 block text-xl text-white font-bold mb-2 pb-2 hover:cursor-pointer"
            >
              Home
            </span>
            {isStudentAdvisor && ( 
            <span
              onClick={toggleCourseMenu}
              className="transition-opacity hover:opacity-60 block text-xl text-white font-bold mb-2 py-2 hover:cursor-pointer"
            >
              Course
            </span>
           )} 
           {courseMenuOpen && (
              <div className="bg-sa-maroon py-2 px-4 mt-2">

                <span
                  onClick={handleCourseRegisterClick}
                  className="block text-white font-bold text-xl py-2 mb-2 cursor-pointer "
                >
                  Register Courses
                </span>
                <span
                  onClick={handleAssignCourseClick}
                  className="block text-white font-bold text-xl py-2 mb-2 cursor-pointer "
                >
                  Assign Courses
                </span>
              </div>
            )}

            {isStudentAdvisor && ( 
            <span
              onClick={handleLeaveClick}
              className="transition-opacity hover:opacity-60 block text-xl text-white font-bold mb-2 py-2 hover:cursor-pointer"
            >
              Leave
            </span>
            )}
            <span
              onClick={toggleAccountMenu}
              className="transition-opacity hover:opacity-60 block text-xl text-white font-bold mb-2 py-2 hover:cursor-pointer"
            >
              Account
            </span>
            {accountMenuOpen && (
              <div className="bg-sa-maroon py-2 px-4  mt-2">
                <span onClick={handleProfileClick} className="block text-white font-bold text-xl py-2 mb-2 cursor-pointer ">Profile Information</span>
                <span onClick={handleChangePasswordClick} className="block text-white font-bold text-xl py-2 mb-2 cursor-pointer ">Change Password</span>
                <span onClick={openSignOut} className="block text-white font-bold text-xl py-2 mb-2 cursor-pointer ">Sign Out</span>
              </div>
            )}
          </div>
        )}
        <div className="md:block hidden">
          <span
            onClick={handleHomeClick}
            onMouseEnter={toggleHomeMenu}
            className="transition-opacity hover:opacity-60 text-xl text-white font-bold mx-5 hover:cursor-pointer"
          >
            Home
          </span>
          {isStudentAdvisor && ( 
          <span
          onMouseEnter={toggleCourseMenu}
          className="transition-opacity hover:opacity-60 text-xl text-white font-bold mx-5 hover:cursor-pointer"
            // onClick={handleCourseClick}
            // className="transition-opacity hover:opacity-60 text-xl text-white font-bold mx-5 hover:cursor-pointer"
          >
            Course
          </span>
           )} 
           
          {isStudentAdvisor && ( 
          <span
            onMouseEnter={toggleLeaveMenu}
            onClick={handleLeaveClick}
            className="transition-opacity hover:opacity-60 text-xl text-white font-bold mx-5 hover:cursor-pointer"
          >
            Leave
          </span>
           )} 
          <span
            onMouseEnter={toggleAccountMenu}
            className="transition-opacity hover:opacity-60 text-xl text-white font-bold mx-5 hover:cursor-pointer"
          >
            Account
          </span>
          {courseMenuOpen && (
            <div className="bg-white absolute border z-50 border-sa-grey top-full right-44 mt-1 py-2 px-4 rounded-xl shadow-xl w-64"
              onMouseLeave={handleMouseLeave}>
              <span
                onClick={handleCourseRegisterClick}
                className="block border-b-2 border-sa-maroon text-sa-maroon font-bold text-lg py-2 mb-2 cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out hover:bg-gray-200"
              >
                Register Courses
              </span>
              <span
                onClick={handleAssignCourseClick}
                className="block hover:scale-105 transition-all duration-300 ease-in-out text-sa-maroon font-bold text-lg py-2  cursor-pointer hover:bg-gray-200"
              >
                Assign Courses
              </span>
            </div>
          )}
          {accountMenuOpen && (
            <div
              onMouseLeave={handleMouseLeave}
              className="bg-white absolute border z-50 border-sa-grey top-full right-0  py-2 px-4 rounded-xl shadow-xl w-64">
              <span onClick={handleProfileClick} className=" border-b-2 mb-1 border-sa-maroon hover:scale-105 transition-all duration-300 ease-in-out block text-sa-maroon font-bold text-lg py-2 cursor-pointer hover:bg-gray-200 ">Profile Information</span>
              <span onClick={handleChangePasswordClick} className=" border-b-2 mb-1 border-sa-maroon hover:scale-105 transition-all duration-300 ease-in-out block text-sa-maroon font-bold text-lg py-2 cursor-pointer hover:bg-gray-200 ">Change Password</span>
              <span onClick={openSignOut} className="  border-sa-maroon hover:scale-105 transition-all duration-300 ease-in-out block text-sa-maroon font-bold text-lg py-2 cursor-pointer hover:bg-gray-200">Sign Out</span>
            </div>
          )}
          

        </div>
        {isSignout && (
          <div
            className=" fixed inset-0 flex items-center justify-center z-50"
            onClick={closeSignOut}
          >
            <div className=" bg-black opacity-50 absolute inset-0"></div>
            <div
              className=" bg-white rounded-3xl md:w-auto w-80  p-8 px-12 relative z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-black font-semibold md:w-auto w-60 text-left mb-4">
                Confirm
              </h2>
              <p className="text-black text-filter-heading md:w-auto w-60 text-left">
                Are you sure you want to sign out of your account?
              </p>
              <div className="flex justify-end mt-5">
                <button
                  onClick={closeSignOut}
                  className="text-filter-heading hover:opacity-80 hover:scale-105 transition-all duration-300 ease-in-out mr-4 border-2 border-gray-400 rounded-[9px] border-filter-heading py-1 px-6"
                >
                  Cancel
                </button>
                <button
                  className="bg-sa-maroon hover:opacity-80 hover:scale-105 transition-all duration-300 ease-in-out text-white md:px-7 px-4  rounded-[9px] md:py-2 py-3 "
                  onClick={handleSignout}
                >
                   {showLoading ? <Spinner /> :'Sign Out'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FacultyNavbar;
