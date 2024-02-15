import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import Select from "react-select";
import Toast from "../../../components/toast/toast";
import Sidebar from "../../../components/sidebar/sidebar";

function CreateStudent() {
  const navigate = useNavigate();

  const [toastMessages, setToastMessages] = useState([]);

  const [showPassword, setShowPassword] = useState(false);
  const [studentName, setStudentName] = useState(""); // 
  const [contactNo, setContactNo] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
//   const [selectedStudentEmail, setSelectedStudentEmail] = useState(null);

  const handleStudentNameChange = (e) => { 
    setStudentName(e.target.value); 
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleContactNoChange = (e) => {
    setContactNo(e.target.value); 
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

//   const handleStudentEmailChange = (selectedOption) => {
//     setSelectedStudentEmail(selectedOption);
//   };
  const isValidEmail = (email) => {
    // Regular expression for validating email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleCreate = () => {
    if (!studentName.trim()) { // Changed parentName to studentName
      setToastMessages([
        ...toastMessages,
        {
          type: "invalid",
          title: "Invalid Name",
          body: "Name cannot be empty",
        },
      ]);
      return;
    }
    if (!email.trim()) {
      setToastMessages([
        ...toastMessages,
        {
          type: "invalid",
          title: "Invalid Email",
          body: "Email cannot be empty",
        },
      ]);
      return;
    }
    if (!isValidEmail(email)) {
      setToastMessages([
        ...toastMessages,
        {
          type: "invalid",
          title: "Invalid Email",
          body: "Enter valid email address",
        },
      ]);
      return;
    }
    if (!password.trim()) {
      setToastMessages([
        ...toastMessages,
        {
          type: "invalid",
          title: "Invalid Password",
          body: "Password cannot be empty",
        },
      ]);
      return;
    }
    // if (!selectedStudentEmail) {
    //   setToastMessages([
    //     ...toastMessages,
    //     {
    //       type: "invalid",
    //       title: "Error",
    //       body: "Student Email must be selected",
    //     },
    //   ]);
    //   return;
    // }

    // Perform create action, navigate, etc.
    navigate("/adboard/dashboard");
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  function updateFileName(event) {
    const file = event.target.files[0];
    
    if (file) {
      const fileName = file.name;
      const allowedExtensions = [".jpg", ".jpeg", ".png"];
      const extension = fileName.substring(fileName.lastIndexOf('.'));
      
      if (allowedExtensions.includes(extension)) {
        document.getElementById("faceID").value = fileName;
      } else {
        setToastMessages([
            ...toastMessages,
            {
              type: "invalid",
              title: "Invalid File",
              body: "Only JPEG, JPG, and PNG files are allowed",
            },
          ]);
    
       
        document.getElementById("faceID").value = "";
      }
    } else {
      document.getElementById("faceID").value = "";
    }
  }
//   const studentEmailOptions = [
//     { value: "student1@example.com", label: "Student 1" },
//     { value: "student2@example.com", label: "Student 2" },
//     { value: "student3@example.com", label: "Student 3" },
//   ];
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   const customStyles = {
//     control: (provided, state) => ({
//       ...provided,
//       border: "1px solid black", // customize border color when focused
//       borderRadius: "10px",
//       boxShadow: "none",
//       height: isMobile ? "56px" : "64px", // height for normal and md breakpoints
//       // height for lg and xl breakpoints
//       textAlign: "left",
//       background: "transparent",
//     }),
//     option: (provided, state) => ({
//       ...provided,
//       color: "black", // text color
//       textAlign: "left",
//     }),
//   };
  


  return (
    <div className="flex">
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
      <div className="md:ml-14 ml-5 w-full mx-[6%] ">
        <p className="text-sa-maroon text-[36px]  mb-5 text-left md:mt-10 mt-20 font-bold">
          Create Student 
        </p>

        <div className="md:ml-3 ml-2 mt-5 md:mt-6 mb-5 ">
          <input
            type="text"
            id="studentName" 
            placeholder="Name" 
            onChange={handleStudentNameChange} 
            value={studentName} 
            className="placeholder-gray-500 w-full h-14 md:h-16  border-[1px] border-black border-solid   text-black p-2 rounded-xl focus:outline-none focus:ring-0 focus:border focus:border-sa-maroon"
          />
        </div>
        <div className="md:ml-3 ml-2 mt-5 md:mt-6 mb-5 ">
          <input
            type="email"
            id="email"
            placeholder="Email"
            onChange={handleEmailChange}
            value={email}
            className="placeholder-gray-500 w-full h-14 md:h-16 border-[1px] border-black border-solid   text-black p-2 rounded-xl focus:outline-none focus:ring-0 focus:border focus:border-sa-maroon"
          />
        </div>
        <div class="relative  md:ml-3 ml-2 mt-5 md:mt-6 mb-5  ">
          <input
            type={showPassword ? "text" : "password"}
            className="placeholder-gray-500 w-full h-14 md:h-16 border-[1px] border-black border-solid bg-transparent  text-black p-2 rounded-xl focus:outline-none focus:ring-0 focus:border focus:border-sa-maroon"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
          />
          {showPassword ? (
            <VisibilityOutlinedIcon
              className="absolute md:top-[20px] top-[16px] right-[12px] md:right-[14px] cursor-pointer text-sa-black"
              onClick={toggleShowPassword}
            />
          ) : (
            <VisibilityOffOutlinedIcon
              className="absolute md:top-[20px] top-[16px] right-[12px] md:right-[14px] cursor-pointer text-sa-black"
              onClick={toggleShowPassword}
            />
          )}
        </div>

        <div className="md:ml-3 ml-2 mt-5 md:mt-6 mb-5 ">
          <input
            type="number"
            id="contactNo"
            placeholder="Contact No."
            onChange={handleContactNoChange}
            value={contactNo} 
            className="placeholder-gray-500 w-full h-14 md:h-16 border-[1px] border-black border-solid   text-black p-2 rounded-xl focus:outline-none focus:ring-0 focus:border focus:border-sa-maroon "
          />
        </div>
        <div className="md:ml-3 ml-2 mt-5 md:mt-6 mb-5 ">
        {/* <label
            className="text-sa-black block text-left  text-md font-[600] mb-2 text-filter-heading"
            htmlFor="link"
          >
            Face ID
          </label>
       

          <input
            id="attachment"
            onChange={handleAttachmentChange}
            type="file"
            className={`placeholder-gray-500 h-14 md:h-16 py-4 w-full border-[1px] border-black border-solid text-black bg-clue-black p-2 rounded-xl focus:outline-none focus:ring-0 focus:border focus:border-sa-maroon`}
          />  
          <p class="mt-1 text-xs text-black text-left " id="file_input_help"> (PNG, JPG or JPEG)</p>  
            */}
            <form>
  <div className="relative mb-10">
    <input
      type="search"
      id="faceID"
      className="placeholder-gray-500 focus:outline-none focus:ring-0 focus:border focus:border-sa-maroon h-14 md:h-16 py-4 block w-full p-4 border border-black border-solid text-black rounded-xl bg-white focus:ring-blue-500"
      placeholder="Face ID (PNG, JPG or JPEG)"
      required
      disabled 
    />
    <label
      htmlFor="fileInput"
      className="transition-opacity hover:opacity-90 md:mr-4 text-white absolute end-2.5 bottom-2.5 bg-sa-maroon focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 md:py-3 py-2  cursor-pointer"
    >
      Choose an Image
      <input
        type="file"
        id="fileInput"
        accept=".png, .jpg, .jpeg"
        className="hidden"
        onChange={updateFileName}
      />
    </label>
  </div>
</form>

           </div>
        {/* <div className="md:ml-3 ml-2 mt-5 md:mt-6 mb-10 ">
          <Select
            id="studentEmail"
            placeholder="Select Student Email"
            onChange={handleStudentEmailChange}
            value={selectedStudentEmail}
            styles={customStyles}
            options={studentEmailOptions}
            //className="text-left h-14 md:h-16 border-[1px] border-black border-solid text-black p-2 rounded-xl focus:outline-none focus:ring-0 focus:border focus:border-sa-maroon"
          />
        </div> */}

        <div class="flex items-center justify-center mb-14   ">
          <button
            class=" transition-opacity hover:opacity-90 font-bold shadow-xl focus:outline-none focus:ring-0 bg-sa-maroon  focus:border-sa-maroon peer m-0 block h-[55px] md:h-[56px]  md:w-[250px] w-[220px]  rounded-[20px]   bg-clip-padding px-3 md:py-2   leading-tight text-white text-[20px] md:text-[24px]"
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateStudent;
