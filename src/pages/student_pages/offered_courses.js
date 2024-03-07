
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
  const location = useLocation(); 

  const [toastMessages, setToastMessages] = useState(location.state?.toastMessages || []); // Set initial toastMessages from location state
  const [courses, setCourses] = useState([]); // State to store fetched courses data
  const [coursesReq, setCoursesReq] = useState([]); // State to store fetched courses data
  const [registrationStatus, setRegistrationStatus] = useState({}); // State to keep track of registration status for each course

  useEffect(() => {
    const getCoursesReq = async () => {
      setShowLoading(true);
      try {
        const response = await studentCourseManager.getStudentCourses();
        if (response.success) {
          setCoursesReq(response.data);
          console.log(coursesReq);
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
        setShowLoading(false);
      }
    };
  
    // Call fetchData function when component mounts
    getCoursesReq();
  
    // Add dependencies if needed (e.g., studentToken, confirmPassword)
  }, []);
  
  
  useEffect(() => {
    const fetchData = async () => {
      setShowLoading(true);
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
        setShowLoading(false);
      }
    };
  
    // Call fetchData function when component mounts
    fetchData();
  
    // Add dependencies if needed (e.g., studentToken, confirmPassword)
  }, []);
  
  const coursesData = courses.map(course => ({
    courseID:course._id,
    courseCode: course.courseCode,
    courseTitle: course.courseName,
    creditHrs: course.courseCredHrs,
  }));

  const navigate = useNavigate();


  const handleRegister = async (courseId) => {
    setShowLoading(true);
    try {
      console.log(courseId);
      const response = await studentCourseManager.createCourse(courseId, 'pending');
      if (response.success) {
        setRegistrationStatus(prevStatus => ({
          ...prevStatus,
          [courseId]: 'pending'
        }));
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
      setShowLoading(false);
    }
  };


  return (
    <div className="flex-col">
      <div>
        <StudentNavbar />
      </div>
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
      {showLoading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center ">
          <Spinner />
        </div>
      )}
        <div className="md:mt-14 mt-10">
          <div className="flex justify-between mx-10 md:mx-24">
            <span className="text-sa-maroon font-bold text-[28px] md:text-[36px]">
            Offered Courses
            </span>
          </div>
          <div className="flex justify-between mx-10 md:mx-24 mt-2 italic font-semibold text-red-600">
  *Note: Contact your student advisor in case of removal or rejection of course.*
</div>
          <div className="overflow-x-auto mt-10 mx-10 md:ml-[6%] md:w-[90%] md:shadow-xl rounded-2xl">
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
        onClick={() => handleRegister(course.courseID)}
      >
        {showLoading ? <Spinner /> : 'Register'}
      </button>
    )}



  
</div>
                     
                    </td>
                    
                  </tr>
                ))}
                <tr className="border-b-0">
                  <td className="md:py-32 py-16 border-r border-sa-grey w-[100px]"></td>
                  <td className="md:py-32 py-16 border-r border-sa-grey"></td>
                  <td className="md:py-32 py-16 border-r border-sa-grey"></td>
                  <td className="md:py-32 py-16 border-r border-sa-grey"></td>
                 
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
