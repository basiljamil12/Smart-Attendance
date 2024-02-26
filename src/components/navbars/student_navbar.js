import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function StudentNavbar() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [leaveMenuOpen, setLeaveMenuOpen] = useState(false);
  const [CourseMenuOpen, setCourseMenuOpen] = useState(false);
  const [HomeMenuOpen, setHomeMenuOpen] = useState(false);

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

  const handleLeaveClick = () => {
    navigate("/student/leave");
    setOpen(false);
  };

  const toggleAccountMenu = () => {
    if (leaveMenuOpen == true) {
      setLeaveMenuOpen(false);
    }
    if(accountMenuOpen==true){
      return;
    }
    setAccountMenuOpen(!accountMenuOpen);
  };

  const toggleLeaveMenu = () => {
    if (accountMenuOpen == true) {
      setAccountMenuOpen(false);
    }
    if(leaveMenuOpen==true){
      return;
    }
    setLeaveMenuOpen(!leaveMenuOpen);
  };

  const toggleCourseMenu = () => {
    if (leaveMenuOpen == true) {
      setLeaveMenuOpen(false);
    }
    if(CourseMenuOpen==true){
      return;
    }
    setCourseMenuOpen(!CourseMenuOpen);
  };
  const toggleHomeMenu = () => {
    if (CourseMenuOpen == true) {
      setCourseMenuOpen(false);
    }
    setHomeMenuOpen(!HomeMenuOpen);
  };
  const handleHomeClick = () => {
    navigate("/student/dashboard");
    setOpen(false);
  };

  const handleProfileClick = () => {
    // Handle click on Profile Information
    // You can add your logic here
    navigate('/student/account/information');
    setAccountMenuOpen(false);
  };

  const handleChangePasswordClick = () => {
    // Handle click on Change Password
    // You can add your logic here
    navigate('/student/account/change-password');

    setAccountMenuOpen(false);
  };

  const handleSignoutClick = () => {
    // Handle click on Signout
    // You can add your logic here
    setAccountMenuOpen(false);
  };

  const handleStatusClick = () => {
    // You can add your logic here
    setLeaveMenuOpen(false);
  };

  const handleApplyClick = () => {
    handleLeaveClick();
    setLeaveMenuOpen(false);
  };
  // const handleMouseEnter = () => {
  //   setOpen(true);
  // };
  // Define a timeout variable

  const handleMouseLeave = () => {
    //handleAccountMenuLeave();
    setOpen(false);
    // if(accountMenuOpen==false){
    setAccountMenuOpen(false);
  // }
    setLeaveMenuOpen(false);
    setCourseMenuOpen(false);
  };
  // let leaveMenuTimeout;

  // const handleAccountMenuLeave = () => {
  //   // Delay closing the account menu to allow hovering to leave menu
  //   leaveMenuTimeout = setTimeout(() => {
  //     setAccountMenuOpen(false);
  //   }, 200); // Adjust this delay as needed
  // };

  // const handleAccountMenuEnter = () => {
  //   // Clear the timeout when re-entering the account menu
  //   clearTimeout(leaveMenuTimeout);
  // };
  return (
    <div className="bg-sa-maroon w-full h-24 flex items-center px-10 relative"
    // onMouseEnter={handleMouseEnter}
    >
      <div className="flex justify-start w-full">
        <span className="text-xl md:text-3xl text-white font-bold hover:cursor-pointer">
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
          <div  className="absolute top-full left-0 right-0 bg-sa-maroon z-10 pt-2 pb-4 px-4">
            <span
              onClick={handleHomeClick}
              className="transition-opacity hover:opacity-60 block text-xl text-white font-bold mb-2 pb-2 hover:cursor-pointer"
            >
              Home
            </span>
            <span className="transition-opacity hover:opacity-60 block text-xl text-white font-bold mb-2 py-2 hover:cursor-pointer">
              Course
            </span>
            <span
              onClick={toggleLeaveMenu}
              className="transition-opacity hover:opacity-60 block text-xl text-white font-bold mb-2 py-2 hover:cursor-pointer"
            >
              Leave
            </span>
            {leaveMenuOpen && (
              <div className="bg-sa-maroon py-2 px-4 mt-2">
                <span
                  onClick={handleApplyClick}
                  className="block text-white font-bold text-xl py-2 mb-2 cursor-pointer hover:bg-gray-200"
                >
                  Apply For Leave
                </span>
                <span
                  onClick={handleStatusClick}
                  className="block text-white font-bold text-xl py-2 mb-2 cursor-pointer hover:bg-gray-200"
                >
                  View Leave Status
                </span>
              </div>
            )}
            <span
              onClick={toggleAccountMenu}
              className="transition-opacity hover:opacity-60 block text-xl text-white font-bold mb-2 py-2 hover:cursor-pointer"
            >
              Account
            </span>
            {accountMenuOpen && (
              <div className="bg-sa-maroon py-2 px-4 mt-2">
                <span
                  onClick={handleProfileClick}
                  className="block text-white font-bold text-xl py-2 mb-2 cursor-pointer hover:bg-gray-200"
                >
                  Profile Information
                </span>
                <span
                  onClick={handleChangePasswordClick}
                  className="block text-white font-bold text-xl py-2 mb-2 cursor-pointer hover:bg-gray-200"
                >
                  Change Password
                </span>
                <span
                  onClick={handleSignoutClick}
                  className="block text-white font-bold text-xl py-2 mb-2 cursor-pointer hover:bg-gray-200"
                >
                  Signout
                </span>
              </div>
            )}
          </div>
        )}
        <div  className="md:block hidden w-full"
            // onMouseEnter={handleAccountMenuEnter}
            >
          <span
               onMouseEnter={toggleHomeMenu}
            className="transition-opacity hover:opacity-60 text-xl text-white font-bold mx-5 hover:cursor-pointer"
          >
            Home
          </span>
          <span
            onMouseEnter={toggleCourseMenu}
           className="transition-opacity hover:opacity-60 text-xl text-white font-bold mx-5 hover:cursor-pointer">
            Course
          </span>
          <span
            //onClick={toggleLeaveMenu}
            onMouseEnter={toggleLeaveMenu}
            className="transition-opacity hover:opacity-60 text-xl text-white font-bold mx-5 hover:cursor-pointer"
          >
            Leave
          </span>
          <span
            //onClick={toggleAccountMenu}
            onMouseEnter={toggleAccountMenu}
            //onMouseLeave={handleAccountMenuLeave}
            //  onMouseMove={handleAccountMenuEnter}
            className="transition-opacity hover:opacity-60 text-xl text-white font-bold mx-5 hover:cursor-pointer"
          >
            Account
          </span>
          {accountMenuOpen && (
            <div className="bg-white absolute top-full right-0 mt-1 py-2 px-4 rounded-xl shadow-xl w-64"
    onMouseLeave={handleMouseLeave}
    >

              <span 
                onClick={handleProfileClick}
                // onMouseEnter={(e) => {
                //   e.stopPropagation(); // Stop propagation here
                //   toggleAccountMenu(); // Toggle the menu
                // }}

                className="block text-sa-maroon font-bold text-lg py-2 cursor-pointer hover:bg-gray-200 border-b-2"
              >
                Profile Information
              </span>
              <span
                onClick={handleChangePasswordClick}
                className="block text-sa-maroon font-bold text-lg py-2 cursor-pointer hover:bg-gray-200 border-b-2"
              >
                Change Password
              </span>
              <span
                onClick={handleSignoutClick}
                className="block text-sa-maroon font-bold text-lg py-2 cursor-pointer hover:bg-gray-200"
              >
                Signout
              </span>
            </div>
          )}
          {leaveMenuOpen && (
            <div className="bg-white absolute top-full right-20 mt-1 py-2 px-4 rounded-xl shadow-xl w-64"
            onMouseLeave={handleMouseLeave}>
              <span
                onClick={handleApplyClick}
                className="block text-sa-maroon font-bold text-lg py-2 mb-2 cursor-pointer hover:bg-gray-200"
              >
                Apply For Leave
              </span>
              <span
                onClick={handleStatusClick}
                className="block text-sa-maroon font-bold text-lg py-2 mb-2 cursor-pointer hover:bg-gray-200"
              >
                View Leave Status
              </span>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}

export default StudentNavbar;
