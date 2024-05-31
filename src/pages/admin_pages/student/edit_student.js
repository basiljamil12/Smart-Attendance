import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import Select from "react-select";
import Toast from "../../../components/toast/toast";
import Sidebar from "../../../components/sidebar/sidebar";
import Spinner from "../../../components/spinner/spinner";
import EditStudentManager from "../../../models/admin/student/http/edit_student";
import StudentManager from "../../../models/admin/student/http/get_all_student";
function EditStudent() {
  const editStudentManager = new EditStudentManager();
  const studentManager = new StudentManager();

  const navigate = useNavigate();
  const location = useLocation();

  const [toastMessages, setToastMessages] = useState([]);
  const [showLoading, setShowLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [studentName, setStudentName] = useState(""); //
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const [selectedStudentEmail, setSelectedStudentEmail] = useState(null);
  const [showEditloading, setEditLoading] = useState(false);

  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

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

  useEffect(() => {
    setShowLoading(true);
    studentManager.get(id).then((value) => {
      if (value == null) {
      } else if (!value.error) {
        const baseResponse = value.success;
        if (baseResponse == true) {
          setStudentName(value.data.name);
          setContactNo(value.data.contactno);
          setEmail(value.data.email);
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
    setShowLoading(false);

    }
    
  );

  }, []);

  const handleEdit = async () => {
    if (!studentName.trim()) {
      // Changed parentName to studentName
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
    if (!contactNo) {
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
    try {
      setEditLoading(true);
      const response = await editStudentManager.edit(
        id,
        studentName,
        email,
        contactNo
      );

      if (response.success) {
        const updatedToastMessages = [
          {
            type: "success",
            title: "Success",
            body: response.message,
          },
        ];
        setToastMessages(updatedToastMessages);
        navigate("/adboard/student", {
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
    } catch (response) {
      setToastMessages([
        ...toastMessages,
        {
          type: "invalid",
          title: "Error",
          body: response.message,
        },
      ]);
    } finally {
      setEditLoading(false); // Stop loading
    }
    // if (!selectedStudentEmail)
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  function updateFileName(event) {
    const file = event.target.files[0];

    if (file) {
      const fileName = file.name;
      const allowedExtensions = [".jpg", ".jpeg", ".png"];
      const extension = fileName.substring(fileName.lastIndexOf("."));

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

  

  const [passwordShowLoading, setPasswordShowLoading] = useState(false);
  const [passwordIdx, setPasswordIdx] = useState(0);
  const [isPassword, setIsPassword] = useState("");

  const closeIsPassword = () => {
    setIsPassword(false);
    setPassword("");
  };
  const openIsPassword = (id) => {
    setPasswordIdx(id);
    setIsPassword(true);
  };

  const handlePasswordUpdate = async () => {
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
    try {
      setPasswordShowLoading(true);
      const response = await editStudentManager.editPassword(id, password);

      if (response.success) {
        const updatedToastMessages = [
          {
              type: "success",
              title: "Success",
              body: response.message,
          },
      ];
        setToastMessages(updatedToastMessages);
        navigate("/adboard/student", { state: { toastMessages: updatedToastMessages } });
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
    } catch (response) {
      setToastMessages([
        ...toastMessages,
        {
          type: "invalid",
          title: "Error",
          body: response.message,
        },
      ]);
    } finally {
      setPasswordShowLoading(false);
      closeIsPassword();
    }
    // if (!selectedStudentEmail)
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
       {showLoading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Spinner />
        </div>
      )}
      <div className="md:ml-14 ml-5 w-full mx-[6%] ">
        <p className="text-sa-maroon text-[36px]  mb-5 text-left md:mt-10 mt-20 font-bold">
          Edit Student
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
        {/* <div class="relative  md:ml-3 ml-2 mt-5 md:mt-6 mb-5  ">
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
        </div> */}

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
          {/* <form>
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
      className="transition-opacity hover:opacity-90 md:mr-4 text-white absolute end-2.5 bottom-2.5 bg-sa-maroon focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-2xl text-sm px-4 md:py-3 py-2  cursor-pointer"
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
</form> */}
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
            class="  hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 font-bold shadow-xl focus:outline-none focus:ring-0 bg-sa-maroon  focus:border-sa-maroon peer m-0 block h-[55px] md:h-[56px]  md:w-[250px] w-[200px]  rounded-[20px]   bg-clip-padding px-3 md:py-2   leading-tight text-white text-[14px] md:text-[24px]"
            onClick={handleEdit}
          >
            {showEditloading ? <Spinner /> : "Save"}
          </button>
          <button
            class="ml-5 hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 font-bold shadow-xl focus:outline-none focus:ring-0 bg-sa-maroon  focus:border-sa-maroon peer m-0 block h-[55px] md:h-[56px]  md:w-[280px] w-[200px]  rounded-[20px]   bg-clip-padding px-3 md:py-2   leading-tight text-white text-[14px] md:text-[24px]"
            onClick={openIsPassword}
          >
            Change Password
            {/* {showLoading ? <Spinner /> : "Change Password"} */}
          </button>
        </div>
      </div>
      {isPassword && (
          <div
            className=" fixed inset-0 flex items-center justify-center z-50"
            onClick={closeIsPassword}
          >
            <div className=" bg-black opacity-50 absolute inset-0"></div>
            <div
              className=" bg-white rounded-3xl md:w-[32rem] w-80  p-8 px-12 relative z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-sa-maroon text-xl md:text-2xl  font-semibold md:w-auto w-60 text-left mb-4">
                Update Password
              </h2>
              <p className="text-black  mb-4 text-filter-heading md:w-auto w-60 text-left">
                Enter the new password here:
              </p>
              <div class="relative mb-6 ">
          <input
            type={showPassword ? "text" : "password"}
            class="shadow-xl focus:outline-none focus:ring-0 focus:border-clue-purchase peer m-0 block h-[45px] md:h-[56px]   md:mr-44  md:w-[102%] w-[245px]  rounded-[14px] border-[1px] border-solid  border-black  bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-black"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
          />
          {showPassword ? (
            <VisibilityOutlinedIcon
              className="absolute text-sa-black md:top-[16px] top-[10px] right-[-4px] md:right-[10px] cursor-pointer "
              onClick={toggleShowPassword}
            />
          ) : (
            <VisibilityOffOutlinedIcon
              className="absolute text-sa-black md:top-[16px] top-[10px] right-[-4px] md:right-[10px] cursor-pointer "
              onClick={toggleShowPassword}
            />
          )}
        </div>
              {/* <div className="mt-12 md:mt-5 mb-5 ">
                <input
                  type="text"
                  id="newpass"
                  placeholder="Enter New Password"
                  onChange={handlePasswordChange}
                  value={password}
                  className="placeholder-gray-500 w-full flex items-start justify-start  h-14 md:h-16 py-4  border-[1px] border-black border-solid   text-black p-2 rounded-xl focus:outline-none focus:ring-0 focus:border focus:border-sa-maroon"
                />
              </div> */}
              <div className="flex justify-end mt-6">
                <button
                  onClick={closeIsPassword}
                  className="text-filter-heading md:text-base hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-70 mr-4 border-2 border-gray-400 rounded-[9px] border-filter-heading py-2 px-4 md:px-4"
                >
                  Cancel
                </button>
                <button
                  className="bg-sa-maroon md:text-base hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-70 text-white min-w-28 rounded-[9px] py-2 "
                  onClick={handlePasswordUpdate}
                >
                  {passwordShowLoading ? <Spinner size="h-6 w-6"/> : <span>Save</span>}
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

export default EditStudent;
