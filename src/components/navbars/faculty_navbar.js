import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";

function FacultyNavbar() {
  const [open, setOpen] = useState(false);

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
            <span className="transition-opacity hover:opacity-60 block text-xl text-white font-bold mb-2 pb-2 hover:cursor-pointer">
              Home
            </span>
            <span className="transition-opacity hover:opacity-60 block text-xl text-white font-bold mb-2 py-2 hover:cursor-pointer">
              Course
            </span>
            <span className="transition-opacity hover:opacity-60 block text-xl text-white font-bold mb-2 py-2 hover:cursor-pointer">
              Leave
            </span>
            <span className="transition-opacity hover:opacity-60 block text-xl text-white font-bold mb-2 py-2 hover:cursor-pointer">
              Account
            </span>
          </div>
        )}
        <div className="md:block hidden">
          <span className="transition-opacity hover:opacity-60 text-xl text-white font-bold mx-5 hover:cursor-pointer">
            Home
          </span>
          <span className="transition-opacity hover:opacity-60 text-xl text-white font-bold mx-5 hover:cursor-pointer">
            Course
          </span>
          <span className="transition-opacity hover:opacity-60 text-xl text-white font-bold mx-5 hover:cursor-pointer">
            Leave
          </span>
          <span className="transition-opacity hover:opacity-60 text-xl text-white font-bold mx-5 hover:cursor-pointer">
            Account
          </span>
        </div>
      </div>
    </div>
  );
}

export default FacultyNavbar;
