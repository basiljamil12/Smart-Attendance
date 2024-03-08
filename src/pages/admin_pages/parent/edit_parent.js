import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import Select from "react-select";
import Toast from "../../../components/toast/toast";
import Sidebar from "../../../components/sidebar/sidebar";
import Spinner from "../../../components/spinner/spinner";
import StudentManager from "../../../models/admin/student/http/get_all_student";
import EditParentManager from "../../../models/admin/parent/http/edit_parent";
import ParentManager from "../../../models/admin/parent/http/get_all_parent";
function EditParent() {
  const editParentManager = new EditParentManager();
  const studentManager = new StudentManager();
  const parentManager = new ParentManager();
  const [showLoading, setShowLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const [toastMessages, setToastMessages] = useState([]);

  const [showPassword, setShowPassword] = useState(false);
  const [parentName, setParentName] = useState("");
  const [contactno, setContactno] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [studentData, setStudentData] = useState([]);
  const [selectedStudentEmail, setSelectedStudentEmail] = useState(null);

  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  useEffect(() => {
    getAllStudent();
  }, []);

  useEffect(() => {
    setShowLoading(true);
    parentManager.get(id).then((value) => {
      if (value == null) {
      } else if (!value.error) {
        const baseResponse = value.success;
        if (baseResponse == true) {
          setParentName(value.data.name);
          setContactno(value.data.contactno);
          setEmail(value.data.email);
          setSelectedStudentEmail(value.data.studentID.email);
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
  }, [id]);

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
  };
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

  const handleEdit = async () => {
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
    try {
      setShowLoading(true);
      const response = await editParentManager.edit(
        id,
        parentName,
        email,
        contactno,
        selectedStudentEmail.value
      );

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
        navigate("/adboard/parent", {
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
      setShowLoading(false); // Stop loading
    }

    // Perform create action, navigate, etc.
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const studentEmailOptions = studentData.map((student) => ({
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

  const [passwordShowLoading, setPasswordShowLoading] = useState(false);
  const [passwordIdx, setPasswordIdx] = useState(0);
  const [isPassword, setIsPassword] = useState("");

  const closeIsPassword = () => {
    setIsPassword(false);
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
      const response = await editParentManager.editPassword(id, password);

      if (response.success) {
        setToastMessages([
          ...toastMessages,
          {
            type: "success",
            title: "Success",
            body: response.message,
          },
        ]);
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
          Edit Parent
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
        {/* <div class="relative  md:ml-3 ml-2 mt-5 md:mt-6 mb-5  ">
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
        </div> */}

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
        {selectedStudentEmail && (
        <div className="md:ml-3 ml-2 mt-5 md:mt-6 mb-10 ">
          <Select
            id="studentEmail"
            // placeholder={selectedStudentEmail}
            onChange={handleStudentEmailChange}
            defaultValue={{ label: selectedStudentEmail, value: 0 }}
            styles={customStyles}
            options={studentEmailOptions}
            //className="focus:outline-none focus:ring-0 focus:border focus:border-sa-maroon"
          />
        </div>)}

        <div class="flex items-center justify-center mb-14   ">
          <button
            class=" hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 font-bold shadow-xl focus:outline-none focus:ring-0 bg-sa-maroon  focus:border-sa-maroon peer m-0 block h-[55px] md:h-[56px]  md:w-[250px] w-[200px]  rounded-[20px]   bg-clip-padding px-3 md:py-2   leading-tight text-white text-[14px] md:text-[24px]"
            onClick={handleEdit}
          >
            {showLoading ? <Spinner /> : "Save"}
          </button>
          <button
            class="ml-5 hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 font-bold shadow-xl focus:outline-none focus:ring-0 bg-sa-maroon  focus:border-sa-maroon peer m-0 block h-[55px] md:h-[56px]  md:w-[280px] w-[200px]  rounded-[20px]   bg-clip-padding px-3 md:py-2   leading-tight text-white text-[14px] md:text-[24px]"
            onClick={openIsPassword}
          >
            {showLoading ? <Spinner /> : "Change Password"}
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
                  className="bg-sa-maroon md:text-base hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-70 text-white md:px-8 px-7 rounded-[9px] py-2 "
                  onClick={handlePasswordUpdate}
                >
                  {passwordShowLoading ? <Spinner /> : <span>Save</span>}
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

export default EditParent;
