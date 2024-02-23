import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function ParentNavbar() {
  const [open, setOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const navigate = useNavigate();
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

  const handleHomeClick = () => {
    navigate('/parent/dashboard');
    setOpen(false);
  };

  const toggleAccountMenu = () => {
    setAccountMenuOpen(!accountMenuOpen);
  };

  const handleProfileClick = () => {
    // Handle click on Profile Information
    // You can add your logic here
    setAccountMenuOpen(false);
  };

  const handleChangePasswordClick = () => {
    // Handle click on Change Password
    // You can add your logic here
    setAccountMenuOpen(false);
  };

  const handleSignoutClick = () => {
    // Handle click on Signout
    // You can add your logic here
    setAccountMenuOpen(false);
  };

  return (
    <div className="bg-sa-maroon w-full h-24 flex items-center px-10 relative">
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
          <div className="absolute top-full left-0 right-0 bg-sa-maroon z-10 pt-2 pb-4 px-4">
            <span className="transition-opacity hover:opacity-60 block text-xl text-white font-bold mb-2 pb-2 hover:cursor-pointer"
            onClick={handleHomeClick}
            >
              Home
            </span>
            <span onClick={toggleAccountMenu} className="transition-opacity hover:opacity-60 block text-xl text-white font-bold mb-2 py-2 hover:cursor-pointer">
              Account
            </span>
            {accountMenuOpen && (
              <div className="bg-sa-maroon py-2 px-4 mt-2">
                <span onClick={handleProfileClick} className="block text-white font-bold text-xl py-2 mb-2 cursor-pointer hover:bg-gray-200">Profile Information</span>
                <span onClick={handleChangePasswordClick} className="block text-white font-bold text-xl py-2 mb-2 cursor-pointer hover:bg-gray-200">Change Password</span>
                <span onClick={handleSignoutClick} className="block text-white font-bold text-xl py-2 mb-2 cursor-pointer hover:bg-gray-200">Signout</span>
              </div>
            )}
          </div>
        )}
        <div className="md:block hidden">
          <span   onClick={handleHomeClick} className="transition-opacity hover:opacity-60 text-xl text-white font-bold mx-5 hover:cursor-pointer">
            Home
          </span>
          <span onClick={toggleAccountMenu} className="transition-opacity hover:opacity-60 text-xl text-white font-bold mx-5 hover:cursor-pointer">
            Account
          </span>
          {accountMenuOpen && (
            <div className="bg-white absolute top-full right-5 mt-1 py-2 px-4 rounded-xl shadow-xl w-64">
              <span onClick={handleProfileClick} className="block text-sa-maroon font-bold text-lg py-2 cursor-pointer hover:bg-gray-200 border-b-2">Profile Information</span>
              <span onClick={handleChangePasswordClick} className="block text-sa-maroon font-bold text-lg py-2 cursor-pointer hover:bg-gray-200 border-b-2">Change Password</span>
              <span onClick={handleSignoutClick} className="block text-sa-maroon font-bold text-lg py-2 cursor-pointer hover:bg-gray-200">Signout</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ParentNavbar;
