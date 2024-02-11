import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

function Sidebar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(window.innerWidth >= 768);

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

  const goToAdmin = () => {
    navigate("/adboard/dashboard");
  };

  return (
    <>
      {open && window.innerWidth < 768 && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50"
          onClick={handleToggleSidebar}
        ></div>
      )}
      <div
        className={`flex md:w-72 md:relative fixed md:overflow-y-auto md:overflow-x-hidden bg-sa-maroon h-screen pt-5 transition-transform duration-300 flex-shrink-0 z-10 ${
          open ? "translate-x-0 w-72" : "-translate-x-full w-0"
        }`}
        style={{ maxHeight: "100vh" }}
      >
        {open ? (
          <div className="w-full">
            {window.innerWidth < 768 && (
              <span
                className="flex justify-end mr-5"
                onClick={handleToggleSidebar}
              >
                <CloseIcon style={{ color: "white", fontSize: 30 }} />
              </span>
            )}
            <div className="px-10 pb-10 pt-5 md:pt-10">
              <span className="text-white font-bold text-xl md:text-2xl">
                Smart Attendance
              </span>
            </div>
            <div className="border-b-2 border-white mx-4 mb-10 opacity-20"></div>
            <div
              className="px-10 pt-5 border-b-10 hover:cursor-pointer"
              onClick={goToFaculty}
            >
              <span className="text-white font-bold text-xl">Faculty</span>
            </div>
            <div className="border-b-2 border-white mx-4 my-5 opacity-20"></div>
            <div
              className="px-10 border-b-10 hover:cursor-pointer"
              onClick={goToStudent}
            >
              <span className="text-white font-bold text-xl">Student</span>
            </div>
            <div className="border-b-2 border-white mx-4 my-5 opacity-20"></div>
            <div
              className="px-10 border-b-10 hover:cursor-pointer"
              onClick={goToParent}
            >
              <span className="text-white font-bold text-xl">Parent</span>
            </div>
            <div className="border-b-2 border-white mx-4 my-5 opacity-20"></div>
            <div
              className="px-10 border-b-10 hover:cursor-pointer"
              onClick={goToAdmin}
            >
              <span className="text-white font-bold text-xl">Admin</span>
            </div>
            <div className="border-b-2 border-white mx-4 my-5 opacity-20"></div>
            <div className="px-10 border-b-10 hover:cursor-pointer">
              <span className="text-white font-bold text-xl">Sign Out</span>
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
    </>
  );
}

export default Sidebar;
