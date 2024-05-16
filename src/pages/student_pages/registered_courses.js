
import React, { useEffect, useRef, useState } from "react";
import StudentNavbar from "../../components/navbars/student_navbar";
import { useNavigate } from "react-router";
import CourseManager from "../../models/admin/course/http/get_all_course";
import { useLocation } from 'react-router-dom';
import StudentCourseManager from "../../models/courses/http/course_req";
import Spinner from "../../components/spinner/spinner";
import Toast from "../../components/toast/toast";
function RegisteredCourses() {
  const courseManager = new CourseManager();
  const studentCourseManager = new StudentCourseManager();
  const [showLoading, setShowLoading] = useState(false);
  const location = useLocation(); 

  const [toastMessages, setToastMessages] = useState(location.state?.toastMessages || []); // Set initial toastMessages from location state
//   const [courses, setCourses] = useState([]); // State to store fetched courses data
  const [coursesReq, setCoursesReq] = useState([]); // State to store fetched courses data
  const [registrationStatus, setRegistrationStatus] = useState({}); // State to keep track of registration status for each course

  useEffect(() => {
    const getCoursesReq = async () => {
      setShowLoading(true);
      try {
        const response = await studentCourseManager.getStudentCourses();
        if (response.success) {
          setCoursesReq(response.data);
          const initialRegistrationStatus = {};
          response.data.map(course => {
            if (course.status === 'accepted') {
              initialRegistrationStatus[course.courseId._id] = 'accepted';
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
  
 
  
  const acceptedCourses = coursesReq.filter(course => course.status === 'accepted');

  const AttendanceData = acceptedCourses.map(course => ({
    courseID: course.courseId._id,
    courseCode: course.courseId.courseCode,
    courseTitle: course.courseId.courseName,
    creditHrs: course.courseId.courseCredHrs,
    assignTeacher: course.courseId.courseTeacher,
  }));

  const navigate = useNavigate();




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
            Registered Courses
            </span>
            
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
                  <th className="p-0 py-5  border-r border-sa-grey">
                    Assigned Teacher
                  </th>           
                  <th className="p-0 py-5  border-sa-grey">
                    Status
                  </th>
                    </tr>
              </thead>
              <tbody>
                {AttendanceData.map((course, index) => (
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
                    <td className="p-0 py-5  border-r border-sa-grey">
                      <span
                        className="block w-full h-full overflow-hidden overflow-ellipsis"
                        style={{ wordWrap: "break-word" }}
                      >
                       {course.assignTeacher ? course.assignTeacher : "N/A"}
                      </span>
                    </td>
                    <td className="p-0 py-5  border-r border-sa-grey">
                      <span
                        className=" text-green-600 font-semibold block w-full h-full overflow-hidden overflow-ellipsis"
                        style={{ wordWrap: "break-word" }}
                      >
                        Registered
                      </span>
                    </td>
                    
                  </tr>
                ))}
                <tr className="border-b-0">
                  <td className="md:py-16 py-16 border-r border-sa-grey w-[100px]"></td>
                  <td className="md:py-16 py-16 border-r border-sa-grey"></td>
                  <td className="md:py-16 py-16 border-r border-sa-grey"></td>
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

export default RegisteredCourses;
