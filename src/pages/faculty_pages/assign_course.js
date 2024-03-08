
import React, { useEffect, useRef, useState } from "react";
import FacultyNavbar from "../../components/navbars/faculty_navbar";
import { useNavigate } from "react-router";
import CourseManager from "../../models/admin/course/http/get_all_course";
import { useLocation } from 'react-router-dom';
import StudentCourseManager from "../../models/courses/http/course_req";
import Spinner from "../../components/spinner/spinner";
import Toast from "../../components/toast/toast";
import Select from "react-select";
import FacultyManager from "../../models/admin/faculty/http/get_all_faculty";
import CourseAssignManager from "../../models/courses/http/assign_course";

function AssignCourse() {
  const facultyManager = new FacultyManager();
  const courseAssignManager = new CourseAssignManager();

    const courseManager = new CourseManager();
    const studentCourseManager = new StudentCourseManager();
    const [showLoading, setShowLoading] = useState(false);
    const [assignLoading, setAssignLoading] = useState(false);
    const location = useLocation();

    const [toastMessages, setToastMessages] = useState(location.state?.toastMessages || []); // Set initial toastMessages from location state
    const [courses, setCourses] = useState([]); // State to store fetched courses data
    const [coursesReq, setCoursesReq] = useState([]); // State to store fetched courses data
    const [registrationStatus, setRegistrationStatus] = useState({}); // State to keep track of registration status for each course

    //   useEffect(() => {
    //     const getCoursesReq = async () => {
    //       setShowLoading(true);
    //       try {
    //         const response = await studentCourseManager.getStudentCourses();
    //         if (response.success) {
    //           setCoursesReq(response.data);
    //           console.log(coursesReq);
    //           const initialRegistrationStatus = {};
    //           response.data.map(course => {
    //             if (course.status === 'pending') {
    //               initialRegistrationStatus[course.courseId._id] = 'pending';
    //             }
    //            else if (course.status === 'accepted') {
    //             initialRegistrationStatus[course.courseId._id] = 'accepted';
    //           }
    //           else if (course.status === 'removed') {
    //             initialRegistrationStatus[course.courseId._id] = 'removed';
    //           }
    //           else if (course.status === 'rejected') {
    //             initialRegistrationStatus[course.courseId._id] = 'rejected';
    //           }
    //           });
    //           setRegistrationStatus(initialRegistrationStatus);
    //         } else {
    //           setToastMessages([
    //             ...toastMessages,
    //             {
    //               type: "invalid",
    //               title: "Error",
    //               body: response.message,
    //             },
    //           ]);
    //         }
    //       } catch (error) {
    //         setToastMessages([
    //           ...toastMessages,
    //           {
    //             type: "invalid",
    //             title: "Error",
    //             body: error.message,
    //           },
    //         ]);
    //       } finally {
    //         setShowLoading(false);
    //       }
    //     };

    //     // Call fetchData function when component mounts
    //     getCoursesReq();

    //     // Add dependencies if needed (e.g., studentToken, confirmPassword)
    //   }, []);
    const fetchData = async () => {
      setShowLoading(true);
      try {
          const response = await courseManager.getAll("faculty");
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

    useEffect(() => {
        

        // Call fetchData function when component mounts
        fetchData();

        // Add dependencies if needed (e.g., studentToken, confirmPassword)
    }, []);
    const [facultyData, setFacultyData] = useState([]);

    const getAllFaculty = () => {
        facultyManager.getAll().then((value) => {
          if (value == null) {
          } else if (!value.error) {
            const baseResponse = value.success;
            if (baseResponse == true) {
              setFacultyData(value.data);
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
    const coursesData = courses.map(course => ({
        courseID: course._id,
        courseCode: course.courseCode,
        courseTitle: course.courseName,
        creditHrs: course.courseCredHrs,
        courseTeacher: course.courseTeacher,
        // status: course.status,
        status: course.status,
    }));

    const navigate = useNavigate();


     
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const customStyles = {
        control: (provided, state) => ({
          ...provided,
          border: "1px solid black", // customize border color when focused
          borderRadius: "10px",
          boxShadow: "none",
          height: isMobile ? "56px" : "56px", // height for normal and md breakpoints
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
      

  const [selectedFacultyName, setSelectFacultyName] = useState(null);

    const handleStudentEmailChange = (selectedOption) => {
        setSelectFacultyName(selectedOption);
      };
      const facultyNameOptions = facultyData.map(faculty => ({
        value: faculty._id,
        label: `${faculty.name}`, // Assuming student object has 'name' property
      }));
    const [assignCourseIdx, setassignCourseIdx] = useState("");
    const [assignCourse, setassignCourse] = useState("");
  
    const openAssignCoursePopup = (id) => {
        console.log("a",id);
        getAllFaculty();
        setassignCourseIdx(id);
        setassignCourse(true);
      };
      const closeAssignCoursePopup = () => {
        setassignCourse(false);
        setSelectFacultyName("");
      };
      function capitalizeFirstLetter(string) {
        if (typeof string !== "string" || string.length === 0) {
            return ""; // Return an empty string or handle the case where string is undefined or empty.
        }
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const handleAssign = async (courseId,facultyName) => {
        
        setShowLoading(true);
        try {
          const response = await courseAssignManager.assign(courseId,facultyName );
          if (response.success) {
        
            setToastMessages([
            ...toastMessages,
            {
              type: "success",
              title: "Success",
              body: response.message,
            },
          ]);
          closeAssignCoursePopup();
          const updatedResponse = await courseManager.getAll("faculty");
          if (updatedResponse.success) {
              setCourses(updatedResponse.data);
             
          } else {
              setToastMessages([
                  ...toastMessages,
                  {
                      type: "invalid",
                      title: "Error",
                      body: updatedResponse.message,
                  },
              ]);
          }
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
                <FacultyNavbar />
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
                            Courses Information
                        </span>
                    </div>

                    <div className="overflow-x-auto mt-10 mb-10 mx-10 md:ml-[6%] md:w-[90%] md:shadow-xl rounded-2xl">
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
                                        Assigned To
                                    </th>

                                    <th className="p-0 py-5 border-r border-sa-grey">
                                        Actions
                                    </th>
                                    <th className="p-0 py-5  border-sa-grey">
                                        Status
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
                                        <td className="p-0 py-5 border-r border-sa-grey">
                                            <span
                                                className="block w-full h-full overflow-hidden overflow-ellipsis"
                                                style={{ wordWrap: "break-word" }}
                                            >
                                                {course.courseTeacher ? course.courseTeacher.name : "N/A"}
                                               
                                                {/* {course.courseTeacher ? course.courseTeacher : "N/A"} */}
                                            </span>
                                        </td>



                                        <td className="p-2 py-5 border-r border-sa-grey">
                                            <div class="lg:inline-flex rounded-lg border  bg-sa-pink p-1">
                                                {course.status === "assigned" ? (
                                                    <button
                                                        className="bg-[#d9534f] cursor-pointer  text-white inline-flex items-center gap-2 rounded-md  lg:px-6 xl:px-11 md:px-2 px-3 py-2 text-md hover:opacity-90 hover:scale-105 transition-all duration-300 ease-in-out hover:text-gray-300 focus:relative"
                                                     onClick={() => handleAssign(course.courseID,null)}
                                                    
                                                    >
                                                        {showLoading ? <Spinner /> : "Remove"}
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="bg-sa-maroon cursor-pointer text-white inline-flex items-center gap-2 rounded-md lg:px-6 px-3 py-2 text-md hover:opacity-90 hover:scale-105 transition-all duration-300 ease-in-out hover:text-gray-300 focus:relative"
                                                    // onClick={() => handleRegister(course.courseID)}
                                                    onClick={() => openAssignCoursePopup(course.courseID)} 
                                                    >
                                                        {showLoading ? <Spinner /> : "Assign Course"}
                                                    </button>
                                                )}
                                            </div>
                                        </td>

                                        <td className="p-0 py-5  border-sa-grey">
                                            <span
                                                className={`block text-base w-full h-full overflow-hidden overflow-ellipsis font-semibold ${course.status === 'assigned' ? 'text-green-600' :
                                                        course.status === 'pending' ? 'text-sa-blue' :
                                                            ''
                                                    }`}
                                                style={{ wordWrap: "break-word" }}
                                            >
                                                {capitalizeFirstLetter(course.status)}

                                                {/* Status */}
                                            </span>
                                        </td>

                                    </tr>
                                ))}
                                <tr className="border-b-0">
                                    <td className="md:py-32 py-16 border-r border-sa-grey w-[100px]"></td>
                                    <td className="md:py-32 py-16 border-r border-sa-grey"></td>
                                    <td className="md:py-32 py-16 border-r border-sa-grey"></td>
                                    <td className="md:py-32 py-16 border-r border-sa-grey"></td>
                                    <td className="md:py-32 py-16 border-r border-sa-grey"></td>
                                    <td className="md:py-32 py-16 border-r border-sa-grey"></td>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {assignCourse && (
              
          <div
            className=" fixed inset-0 flex items-center justify-center z-50"
            onClick={closeAssignCoursePopup}
          >
            
            <div className=" bg-black opacity-50 absolute inset-0"></div>
            <div
              className=" bg-white rounded-3xl md:w-[33rem] w-80  p-8 px-12 relative z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-sa-maroon text-2xl font-semibold md:w-auto w-60 text-left mb-4">
                Assign Course
              </h2>
              <div className="md:ml-3 ml-2 mt-5 md:mt-6 mb-10 ">
          <Select
            id="studentEmail"
            placeholder="Select Faculty to Assign Course"
            onChange={handleStudentEmailChange}
            value={selectedFacultyName}
            styles={customStyles}
            options={facultyNameOptions}
            //className="text-left h-14 md:h-16 border-[1px] border-black border-solid text-black p-2 rounded-xl focus:outline-none focus:ring-0 focus:border focus:border-sa-maroon"
          />
        </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={closeAssignCoursePopup}
                  className="text-filter-heading hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-70 mr-4 border-2 border-gray-400 rounded-[9px] border-filter-heading py-1 px-6"
                >
                  Cancel
                </button>
             
                <button
    className={`bg-sa-maroon hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-70 text-white md:px-8 px-5 rounded-[9px] py-1 ${
        !selectedFacultyName ? 'opacity-50 cursor-not-allowed' : '' // Disable button if no faculty is selected
    }`}
    onClick={() => handleAssign(assignCourseIdx, selectedFacultyName?.value)} // Pass selectedFacultyName.value as facultyName
    disabled={!selectedFacultyName} // Disable button if no faculty is selected
>
    {assignLoading ? <Spinner /> : 'Assign'}
</button>
              </div>
            </div>
          </div>
        )}
        </div>
    );
}

export default AssignCourse;
