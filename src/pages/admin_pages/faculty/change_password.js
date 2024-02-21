import StudentNavbar from "../components/navbars/student_navbar";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Toast from "../components/toast/toast";
import Spinner from "../components/spinner/spinner";

function ChangePassword() {
  const [toastMessages, setToastMessages] = useState([]);
  const [showLoading, setShowLoading] = useState(true);

  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleReset = () => {
    if (!password || !confirmPassword) {
      setToastMessages([
        ...toastMessages,
        {
          type: "invalid",
          title: "Invalid Password",
          body: "Both password are required",
        },
      ]);
      return;
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
            className="placeholder-gray-500 w-full flex items-start justify-start h-14 md:h-16 py-4 border-[1px] border-black border-solid text-black p-2 rounded-xl focus:outline-none focus:ring-0 focus:border focus:border-sa-maroon"
          />
        </div>
        <div class="flex items-center justify-center mb-14">
          <button
            //className="mb-4 h-[45px] md:h-[56px] bg-sa-maroon rounded-[20px] md:w-[102%] w-[245px] md:mr-3  shadow-md mx-5 text-white font-bold text-[26px]"
            class=" transition-opacity hover:opacity-90 font-bold shadow-xl focus:outline-none focus:ring-0 bg-sa-maroon focus:border-sa-maroon peer m-0 block h-[55px] md:h-[56px] md:w-[280px] w-[220px] rounded-[20px] bg-clip-padding px-3 py-2  leading-tight text-white text-[20px] md:text-[24px]"
            onClick={handleReset}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
