import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import Select from "react-select";
import Toast from "../../../components/toast/toast";
import Sidebar from "../../../components/sidebar/sidebar";
import Spinner from "../../../components/spinner/spinner";
import CreateParentManager from "../../../models/admin/parent/http/create_parent";
import StudentManager from "../../../models/admin/student/http/get_all_student";
function CreateParent() {
  const createParentManager = new CreateParentManager();
  const studentManager = new StudentManager();
const [showLoading, setShowLoading] = useState(false);

  const navigate = useNavigate();

  const [toastMessages, setToastMessages] = useState([]);

  const [showPassword, setShowPassword] = useState(false);
  const [parentName, setParentName] = useState("");
  const [parentName1, setParentName1] = useState("");
  const [contactno, setContactno] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [studentData, setStudentData] = useState([]);

  const [selectedStudentEmail, setSelectedStudentEmail] = useState(null);
  useEffect(() => {
    getAllStudent();
  }, []);

  const getAllStudent = () => {
    setShowLoading(true);
    studentManager.getAll().then((value) => {
      if (value == null) {
      } else if (!value.error) {
        const baseResponse = value.success;
        if (baseResponse == true) {
          setStudentData(value.data);
          setShowLoading(false);
        } else {
          setToastMessages([
            ...toastMessages,
            {
              type: "invalid",
              title: "Error",
              body: value.message,
            },
          ]);
        }
      } else {
        setToastMessages([
          ...toastMessages,
          {
            type: "error",
            title: "Error",
            body: value.error,
          },
        ]);
      }
    });
  }
  const handleParentNameChange = (e) => {
    setParentName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleContactNoChange = (e) => {
    setContactno(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleStudentEmailChange = (selectedOption) => {
    setSelectedStudentEmail(selectedOption);
  };
  const isValidEmail = (email) => {
    // Regular expression for validating email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleCreate = async() => {
    if (!parentName.trim()) {
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
    if (!contactno) {
      setToastMessages([
        ...toastMessages,
        {
          type: "invalid",
          title: "Error",
          body: "Contact No. must be selected",
        },
      ]);
      return;
    }
    if (!selectedStudentEmail) {
      setToastMessages([
        ...toastMessages,
        {
          type: "invalid",
          title: "Error",
          body: "Student Email must be selected",
        },
      ]);
      return;
    }
    try{
      setShowLoading(true);
    const response = await createParentManager.create(parentName, email,password,contactno,selectedStudentEmail.value);
    
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
        navigate("/adboard/parent", { state: { toastMessages: updatedToastMessages } });
        
    }
      else{
        setToastMessages([
          ...toastMessages,
          {
            type: "invalid",
            title: "Error",
            body: response.message,
          },
        ]);
      }}
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
        setShowLoading(false); // Stop loading
      }

    // Perform create action, navigate, etc.
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const studentEmailOptions = studentData.map(student => ({
    value: student._id,
    label: `${student.email}`, // Assuming student object has 'name' property
  }));
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: "1px solid black", // customize border color when focused
      borderRadius: "10px",
      boxShadow: "none",
      height: isMobile ? "56px" : "64px", // height for normal and md breakpoints
      // height for lg and xl breakpoints
      textAlign: "left",
      background: "transparent",
    }),
    option: (provided, state) => ({
      ...provided,
      color: "black", // text color
      textAlign: "left",
    }),
  };
  

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
          Create Parent
        </p>

        <div className="md:ml-3 ml-2 mt-5 md:mt-6 mb-5 ">
          <input
            type="text"
            id="parentName"
            placeholder="Name"
            onChange={handleParentNameChange}
            value={parentName}
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
            //class="shadow-xl focus:outline-none focus:ring-0 focus:border-sa-maroon peer m-0 block h-[45px] md:h-[56px]   md:mr-44  md:w-[102%] w-[245px]  rounded-[20px] border-[1px] border-solid  border-black  bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-black"
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
            value={contactno}
            className="placeholder-gray-500 w-full h-14 md:h-16 border-[1px] border-black border-solid   text-black p-2 rounded-xl focus:outline-none focus:ring-0 focus:border focus:border-sa-maroon "
          />
        </div>
        <div className="md:ml-3 ml-2 mt-5 md:mt-6 mb-10 ">
          <Select
            id="studentEmail"
            placeholder="Select Student Email"
            onChange={handleStudentEmailChange}
            value={selectedStudentEmail}
            styles={customStyles}
            options={studentEmailOptions}
            //className="text-left h-14 md:h-16 border-[1px] border-black border-solid text-black p-2 rounded-xl focus:outline-none focus:ring-0 focus:border focus:border-sa-maroon"
          />
        </div>

        <div class="flex items-center justify-center mb-14   ">
          <button
            class=" hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 font-bold shadow-xl focus:outline-none focus:ring-0 bg-sa-maroon  focus:border-sa-maroon peer m-0 block h-[55px] md:h-[56px]  md:w-[250px] w-[220px]  rounded-[20px]   bg-clip-padding px-3 md:py-2   leading-tight text-white text-[20px] md:text-[24px]"
            onClick={handleCreate}
          >
                  {showLoading ? <Spinner /> : 'Create'}

          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateParent;
