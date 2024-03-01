import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import SignoutManager from "../../models/admin/auth/https/signouthttp"; 
import Books from "../../assets/images/course.png"
import Faculty from "../../assets/images/teacherAdboard.png"
import Parent from "../../assets/images/parent2.png"
import Student from "../../assets/images/studentAdboard.png"
import LogoutIcon from '@mui/icons-material/Logout';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
function Sidebar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(window.innerWidth >= 768);
  const signoutManager = new SignoutManager();

  useEffect(() => {
    const handleResize = () => {
      setOpen(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleToggleSidebar = () => {
    setOpen(!open);
  };

  const goToFaculty = () => {
    navigate("/adboard/faculty");
  };

  const goToParent = () => {
    navigate("/adboard/parent");
  };

  const goToStudent = () => {
    navigate("/adboard/student");
  };

  const goToCourse = () => {
    navigate("/adboard/course");
  };
  const [isSignout, setIsSignout] = useState(false);
  
  const closeSignOut = () => {
    
   
    setIsSignout(false);
  };
  const openSignOut = () => {
    setIsSignout(true);
  };
  const handleSignout=async()=>{

      const response = await signoutManager.signout();
        if (response.success) {
          navigate('/adboard/signin');
        } else {
          console.error("Invalid token", response);
        }

  }
  return (
    <>
        {open && window.innerWidth < 768 && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"
          onClick={handleToggleSidebar}
        ></div>
      )}
      <div
        className={`flex md:w-72 md:relative fixed md:overflow-y-auto md:overflow-x-hidden bg-sa-maroon h-screen pt-5 transition-transform duration-300 flex-shrink-0 z-50 ${
          open ? "translate-x-0 w-72 " : "-translate-x-full w-0"
        }`}
        style={{ maxHeight: "100vh" }}
      >
        {open ? (
          <div className="w-full">
            {window.innerWidth < 768 && (
              <span
                className="flex justify-end mr-5 cursor-pointer"
                onClick={handleToggleSidebar}
              >
                <CloseIcon style={{ color: "white", fontSize: 30 }} />
              </span>
            )}
            <div className="px-10 pb-10 pt-5 md:pt-10 ">
              <span className="text-white font-bold text-xl md:text-2xl">
                Smart Attendance
              </span>
            </div>
            <div className="border-b-2 border-white mx-4 mb-14 opacity-20"></div>
            
            <div
              className="flex transition-opacity hover:opacity-80 px-10 pt-5 border-b-10 hover:cursor-pointer"
              onClick={goToFaculty}
            >
              <img src={Faculty} alt="Books" className="w-12 h-12" />
              <span className="text-white font-bold text-xl mt-2 ml-4">Faculty</span>
            </div>
            <div className="border-b-2 border-white mx-4 my-5 opacity-20"></div>
            <div
              className="flex transition-opacity hover:opacity-80 px-10 border-b-10 hover:cursor-pointer"
              onClick={goToStudent}
            >
              <img src={Student} alt="Books" className="w-12 h-12" />
              <span className="ml-4 mt-2 text-white font-bold text-xl">Student</span>
            </div>
            <div className="border-b-2 border-white mx-4 my-5 opacity-20"></div>
            <div
              className="flex transition-opacity hover:opacity-80 px-10 border-b-10 hover:cursor-pointer"
              onClick={goToParent}
            >

              <img src={Parent} alt="Books" className="w-12 h-12" />
              <span className="ml-4 mt-2 text-white font-bold text-xl">Parent</span>
            </div>
            <div className="border-b-2 border-white mx-4 my-5 opacity-20"></div>
            <div
              className="flex transition-opacity hover:opacity-80 px-10 border-b-10 hover:cursor-pointer"
              onClick={goToCourse}
            >
            {/* <AutoStoriesOutlinedIcon style={{ width: 38, height: 38,marginLeft:7}} /> */}

              <img src={Books} alt="Books" className="w-12 h-12" />
          <span className="text-white font-bold text-xl ml-5 mt-2 ">Course</span>
            </div>
            <div className="border-b-2 border-white mx-4 my-5 opacity-20"></div>
            <div className="flex px-10 border-b-10 hover:cursor-pointer">
            <LogoutIcon style={{ width: 44, height: 38,marginLeft:9}} />
              
              <span className="ml-4 mt-1 transition-opacity hover:opacity-80 text-white font-bold text-xl"
              onClick={openSignOut} >
                Sign Out</span>
            </div>
          </div>
        ) : (
          <div className="px-4 py-4">
            <button className="text-black" onClick={handleToggleSidebar}>
              <MenuIcon style={{ color: "#925454" }} />
            </button>
          </div>
        )}
        
      </div>
      {/* {isSignout && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="bg-black opacity-50 absolute inset-0"></div>
    <div
      className="bg-white rounded-lg w-80 p-8 px-12 relative z-10"
      onClick={(e) => e.stopPropagation()}
    >
      <h3 className="text-black text-center mb-4">Confirm</h3>
      <p className="text-black text-center">
        Are you sure you want to sign out of your account?
      </p>
      <div className="flex justify-center mt-6">
        <button
          onClick={closeSignOut}
          className="text-black transition-opacity hover:opacity-70 mr-4 border-2 rounded-lg border-gray-400 py-1 px-4"
        >
          Cancel
        </button>
        <button
          className="bg-sa-maroon transition-opacity hover:opacity-70 text-white px-7 rounded-lg py-1"
          onClick={handleSignout}
        >
          Sign Out
        </button>
      </div>
    </div>
  </div>
)} */}
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
              <div className="flex justify-end mt-6">
                <button
                  onClick={closeSignOut}
                  className="text-filter-heading transition-opacity hover:opacity-70 mr-4 border-2 border-gray-400 rounded-[9px] border-filter-heading py-1 px-6"
                >
                  Cancel
                </button>
                <button className="bg-sa-maroon transition-opacity hover:opacity-70 text-white md:px-7 px-4 rounded-[9px] py-3 md:py-2 "
                onClick={handleSignout}>
                
                Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
    </>
  );
}

export default Sidebar;
