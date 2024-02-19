import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../../../components/sidebar/sidebar";
import Toast from "../../../components/toast/toast";
import CourseCreateManager from "../../../models/admin/course/http/create_course";
import Spinner from "../../../components/spinner/spinner";
function CreateCourse() {
  const courseCreateManager= new CourseCreateManager();
  const navigate = useNavigate();
  const [courseName, setCourseName] = useState("");
  const [courseCode, setcourseCode] = useState("");
  const [credhours, setCredHours] = useState("");
  const [credhours1, setCredHours1Empty] = useState("");
  const [courseName1, setCourseName1Empty] = useState(false);
  const [toastMessages, setToastMessages] = useState([]);
  
  const handleCourseCodeChange = (e) => {
  
      setcourseCode(e.target.value);
   
  };
  const handleCourseNameChange = (e) => {
    setCourseName(e.target.value);
  };

  const handleCredHoursChange = (e) => {
    
    setCredHours(e.target.value);
  };
  const [showLoading, setShowLoading] = useState(false);

  const handleCreate = async() => {
    if (!courseName.trim()) {
      // If subject is empty or contains only whitespace
      setToastMessages([
        ...toastMessages,
        {
          type: "invalid",
          title: "Invalid Course Name",
          body: "Course Name cannot be empty",
        },
      ]);
      return; // Prevent form submission
    }
    if (!courseCode.trim()) {
      setToastMessages([
        ...toastMessages,
        {
          type: "invalid",
          title: "Invalid Credit Hours",
          body: "Credit Hours cannot be empty",
        },
      ]);
      // If subject is empty or contains only whitespace
      return; // Prevent form submission
    }
    if (!courseCode.trim() || !/^([A-Za-z]{3})-([0-9]{3})$/.test(courseCode.trim())) {
      setToastMessages([
          ...toastMessages,
          {
              type: "invalid",
              title: "Invalid Course Code",
              body: "Course Code should be in the format: ABC-112 .",
          },
      ]);
      return; // Prevent form submission
  }
    const codeValue = parseInt(credhours, 10);
    if (isNaN(codeValue) || codeValue > 3) {
        setToastMessages([
            ...toastMessages,
            {
                type: "invalid",
                title: "Invalid Credit Hours",
                body: "Credit Hours cannot be greater than 3 hours",
            },
        ]);
        return; // Prevent form submission
    }
    if (!credhours.trim()) {
      setToastMessages([
        ...toastMessages,
        {
          type: "invalid",
          title: "Invalid Credit Hours",
          body: "Credit Hours cannot be empty",
        },
      ]);
      // If subject is empty or contains only whitespace
      return; // Prevent form submission
    }
    try{
      setShowLoading(true);
    const response = await courseCreateManager.create(courseName, courseCode,credhours);
    
      if(response.success){
        setToastMessages([
          ...toastMessages,
          {
            type: "success",
            title: "Success",
            body: response.message,
          },
        ]);
    navigate("/adboard/course");

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
      <div className="md:ml-14 ml-5  w-full mx-[6%] ">
        <p className="text-sa-maroon  text-[36px] mb-5 text-left md:mt-10 mt-20 font-bold">
          Create Course
        </p>
        <div className="md:ml-3 ml-2 mt-5  md:mt-6 mb-5 ">
          <input
            type="text"
            id="cname"
            placeholder="Course Name"
            onChange={handleCourseNameChange}
            value={courseName}
            className={`placeholder-gray-500 w-full h-14 md:h-16  border-[1px] border-black border-solid   text-black p-2 rounded-xl focus:outline-none focus:ring-0 focus:border focus:border-sa-maroon ${
              courseName1
                ? "border-red-500"
                : "border-[1px] border-black border-solid "
            }`}
          />
        </div>
        <div className="md:ml-3 ml-2 mt-5  md:mt-6 mb-5 ">
          <input
            type="text"
            id="ccode"
            placeholder="Course Code (e.g: ABC-112)"
            onChange={handleCourseCodeChange}
            value={courseCode}
            className="placeholder-gray-500 w-full h-14 md:h-16  border-[1px] border-black border-solid   text-black p-2 rounded-xl focus:outline-none focus:ring-0 focus:border focus:border-sa-maroon "
        
          />
        </div>
        <div className="md:ml-3 ml-2 mt-5 md:mt-6 mb-10 ">
          <input
            type="number"
            id="credhrs"
            placeholder="Credit Hours (Max: 3 Hours)"
            onChange={handleCredHoursChange}
            value={credhours}
            className={`placeholder-gray-500 w-full h-14 md:h-16 border-[1px] border-black border-solid   text-black p-2 rounded-xl focus:outline-none focus:ring-0 focus:border focus:border-sa-maroon ${
              credhours1
                ? "border-red-500"
                : "border-[1px] border-black border-solid "
            }`}
          />
        </div>

        <div class="flex items-center justify-center mb-14   ">
          <button
            //className="mb-4 h-[45px] md:h-[56px] bg-sa-maroon rounded-[20px] md:w-[102%] w-[245px] md:mr-3  shadow-md mx-5 text-white font-bold text-[26px]"
            class=" transition-opacity hover:opacity-90 font-bold shadow-xl focus:outline-none focus:ring-0 bg-sa-maroon  focus:border-sa-maroon peer m-0 block h-[55px] md:h-[56px]  md:w-[250px] w-[220px]  rounded-[20px]   bg-clip-padding px-3 md:py-2   leading-tight text-white text-[20px] md:text-[24px]"
            onClick={handleCreate}
          >
       {showLoading ? <Spinner /> : 'Create'}
            
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateCourse;
