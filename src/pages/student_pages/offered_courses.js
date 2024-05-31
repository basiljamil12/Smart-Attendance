
import React, { useEffect, useRef, useState } from "react";
import StudentNavbar from "../../components/navbars/student_navbar";
import { useNavigate } from "react-router";
import CourseManager from "../../models/admin/course/http/get_all_course";
import { useLocation } from 'react-router-dom';
import StudentCourseManager from "../../models/courses/http/course_req";
import Spinner from "../../components/spinner/spinner";
import Toast from "../../components/toast/toast";
function OfferedCourses() {
  const courseManager = new CourseManager();
  const studentCourseManager = new StudentCourseManager();
  const [showLoading, setShowLoading] = useState(false);
  const [showRegisterloading, setShowRegisterLoading] = useState(false);
  const location = useLocation(); 

  const [toastMessages, setToastMessages] = useState(location.state?.toastMessages || []); // Set initial toastMessages from location state
  const [courses, setCourses] = useState([]); // State to store fetched courses data
  const [coursesReq, setCoursesReq] = useState([]); // State to store fetched courses data
  const [registrationStatus, setRegistrationStatus] = useState({}); // State to keep track of registration status for each course
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [courseID, setCourseID] = useState("");
  
  const closePopup = () => {
    
   
    setIsPopupOpen(false);
    setCourseID("");
  };
  const openPopup = (id) => {
    setCourseID(id);
    setIsPopupOpen(true);
  };
  // useEffect(() => {
    const getCoursesReq = async () => {
      // setShowLoading(true);
      try {
        const response = await studentCourseManager.getStudentCourses();
        if (response.success) {
          setCoursesReq(response.data);
          const initialRegistrationStatus = {};
          response.data.map(course => {
            if (course.status === 'pending') {
              initialRegistrationStatus[course.courseId._id] = 'pending';
            }
           else if (course.status === 'accepted') {
            initialRegistrationStatus[course.courseId._id] = 'accepted';
          }
          else if (course.status === 'removed') {
            initialRegistrationStatus[course.courseId._id] = 'removed';
          }
          else if (course.status === 'rejected') {
            initialRegistrationStatus[course.courseId._id] = 'rejected';
          }
          });
          setRegistrationStatus(initialRegistrationStatus);
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
      } catch (error) {
        setToastMessages([
          ...toastMessages,
          {
            type: "invalid",
            title: "Error",
            body: error.message,
          },
        ]);
      } finally {
        // setShowLoading(false);
      }
    };
  
    // Call fetchData function when component mounts
    // getCoursesReq();
  
    // Add dependencies if needed (e.g., studentToken, confirmPassword)
  // }, []);
  
  
  // useEffect(() => {
    const fetchData = async () => {
      // setShowLoading(true);
      try {
        const response = await courseManager.getAll("student");
        if (response.success) {
          setCourses(response.data);
         
          // const updatedToastMessages = [
          //   ...toastMessages,
          //   {
          //     type: "success",
          //     title: "Success",
          //     body: response.message,
          //   },
          // ];
          // setToastMessages(updatedToastMessages);
  
          // navigate("/student/login", { state: { toastMessages: updatedToastMessages } });
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
      } catch (error) {
        setToastMessages([
          ...toastMessages,
          {
            type: "invalid",
            title: "Error",
            body: error.message,
          },
        ]);
      } finally {
      }
    };
  
    // Call fetchData function when component mounts
    // fetchData();
  
    // Add dependencies if needed (e.g., studentToken, confirmPassword)
  // }, []);
  useEffect(() => {      
    const fetchDataWrapper = async () => {
        setShowLoading(true);
        try{
            await Promise.all([
                fetchData(),
                getCoursesReq(),
            ]);
        }
        catch(e){
            setToastMessages((prevMessages) => [
                ...prevMessages,
                {
                  type: "invalid",
                  title: "Error",
                  body: e.message,
                },
              ]);
        }
        finally{
            setShowLoading(false);

        }
    };
    fetchDataWrapper();
}, []);
  const coursesData = courses.map(course => ({
    courseID:course._id,
    courseCode: course.courseCode,
    courseTitle: course.courseName,
    creditHrs: course.courseCredHrs,
  }));

  const navigate = useNavigate();


  const handleRegister = async (courseId) => {
    setShowRegisterLoading(true);
    try {
      const response = await studentCourseManager.createCourse(courseId, 'pending');
      if (response.success) {
        setRegistrationStatus(prevStatus => ({
          ...prevStatus,
          [courseId]: 'pending'
        }));
        closePopup();
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
    }
    finally{
      setShowRegisterLoading(false);
    }
  };


  return (
    <div className="flex-col">
      <div>
        <StudentNavbar />
      </div>
      {showLoading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Spinner />
        </div>
      )}
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
      <div className="w-full">
     
        <div className="md:mt-14 mt-10">
          <div className="flex justify-between mx-10 md:mx-24">
            <span className="text-sa-maroon font-bold text-[28px] md:text-[36px]">
            Offered Courses
            </span>
          </div>
          <div className="flex justify-between mx-10 md:mx-24 mt-2 italic font-semibold text-red-600">
  *Note: Contact your student advisor in case of removal or rejection of course.*
</div>
          <div className="mb-20 overflow-x-auto mt-10 mx-10 md:ml-[6%] md:w-[90%] md:shadow-xl rounded-2xl">
            <table className="table-fixed min-w-full bg-sa-pink w-[800px] md:w-[50vw] rounded-2xl">
              <thead>
                <tr className="border-b border-sa-grey">
                  <th className="p-0 py-5  border-r border-sa-grey w-[100px]">
                    #
                  </th>
                  <th className="p-0 py-5  border-r border-sa-grey">
                    Course Code
                  </th>
                  <th className="p-0 py-5  border-r border-sa-grey">
                    Course Title
                  </th>
                  <th className="p-0 py-5  border-r border-sa-grey">
                    Credit Hours
                  </th>
                 
                  <th className="p-0 py-5  border-sa-grey">
                    Actions
                  </th>
                    </tr>
              </thead>
              <tbody>
                {coursesData.map((course, index) => (
                  <tr key={index} className="border-b border-sa-grey">
                    <td className="p-0 py-5  border-r border-sa-grey w-[100px]">
                      {index + 1}
                    </td>
                    <td className="p-0 py-5  border-r border-sa-grey">
                      <span
                        className="block w-full h-full overflow-hidden overflow-ellipsis"
                        style={{ wordWrap: "break-word" }}
                      >
                        {course.courseCode}
                      </span>
                    </td>
                    <td className="p-0 py-5  border-r border-sa-grey">
                      <span
                        className="block w-full h-full overflow-hidden overflow-ellipsis"
                        style={{ wordWrap: "break-word" }}
                      >
                        {course.courseTitle}
                      </span>
                    </td>
                    <td className="p-0 py-5  border-r border-sa-grey">
                      <span
                        className="block w-full h-full overflow-hidden overflow-ellipsis"
                        style={{ wordWrap: "break-word" }}
                      >
                        {course.creditHrs}
                      </span>
                    </td>
                   
                    {/* <td className="p-0 py-5  border-sa-grey">
                      <span
                        className="block cursor-pointer transition-opacity hover:opacity-70 text-sa-table-blue w-full h-full underline overflow-hidden overflow-ellipsis"
                        style={{ wordWrap: "break-word" }}
                      >
                      Register
                      </span>
                    </td> */}
                    <td className="p-2 py-5  border-sa-grey">
                    <div  class="lg:inline-flex rounded-lg border  bg-sa-pink p-1">            
                    {registrationStatus[course.courseID] === 'pending' ? (
      <span className="text-sa-blue font-semibold px-8 py-2">Pending</span>
    ) : registrationStatus[course.courseID] === 'accepted' ? (
      <span className="text-green-600 font-semibold px-8 py-2">Registered</span>
    ) : registrationStatus[course.courseID] === 'rejected' ? (
      <span className="text-red-600 font-semibold px-8 py-2">Rejected</span>
      ) : registrationStatus[course.courseID] === 'removed' ? (
        <span className="text-orange-500 font-semibold px-8 py-2">Removed</span>
    ) :(
      <button
        className="bg-sa-maroon cursor-pointer  text-white inline-flex items-center gap-2 rounded-md px-6 py-2 md:text-base text-sm hover:opacity-90 hover:scale-105 transition-all duration-300 ease-in-out hover:text-gray-300 focus:relative"
        onClick={() => openPopup(course.courseID)}
      >
        Register
      </button>
    )}

{isPopupOpen && (
          <div
            className=" fixed inset-0 flex items-center justify-center z-50"
            onClick={closePopup}
          >
            <div className=" bg-black opacity-50 absolute inset-0"></div>
            <div
              className=" bg-white rounded-3xl md:w-auto w-80  p-8 px-12 relative z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-black font-bold text-xl md:w-auto w-60 text-left mb-4">
                Confirm
              </h2>
              <p className="text-black text-filter-heading md:w-auto w-60 text-left">
                Are you sure you want to register this course?
              </p>
              <div className="flex justify-end mt-6">
                <button
                  onClick={closePopup}
                  className="text-filter-heading hover:scale-105 transition-all duration-300 ease-in-out  hover:opacity-70 mr-4 border-2 border-gray-400 rounded-[9px] border-filter-heading py-1 px-6"
                >
                  Cancel
                </button>
                <button className="bg-sa-maroon hover:scale-105 transition-all duration-300 ease-in-out  hover:opacity-70 text-white min-w-28 rounded-[9px] py-3 md:py-2 "
                 onClick={() => handleRegister(courseID)}>
                
                {showRegisterloading ? <Spinner /> : 'Register'}
                </button>
              </div>
            </div>
          </div>
        )}

  
</div>
                     
                    </td>
                    
                  </tr>
                ))}
                <tr className="border-b-0">
                  <td className="md:py-16 py-16 border-r border-sa-grey w-[100px]"></td>
                  <td className="md:py-16 py-16 border-r border-sa-grey"></td>
                  <td className="md:py-16 py-16 border-r border-sa-grey"></td>
                  <td className="md:py-16 py-16 border-r border-sa-grey"></td>
                 
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OfferedCourses;
