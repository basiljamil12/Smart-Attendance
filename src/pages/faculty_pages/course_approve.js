import React, { useEffect, useRef, useState } from "react";
import FacultyNavbar from "../../components/navbars/faculty_navbar";
import { useNavigate } from "react-router";
import { useLocation } from 'react-router-dom';
import FacultyCourseManager from "../../models/courses/http/getallcourses";
import Spinner from "../../components/spinner/spinner";
import Toast from "../../components/toast/toast";
import { FlareSharp } from "@mui/icons-material";
function CourseApproval() {
  const facultyCourseManager = new FacultyCourseManager();
  const [showLoading, setShowLoading] = useState(false);
  const [showLoading2, setShowLoading2] = useState(false);
  const location = useLocation();
  const [coursesReq, setCoursesReq] = useState([]); // State to store fetched courses data
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [courseReqID, setCourseReqID] = useState("");
  const [approveStatus, setApproveStatus] = useState(false);
  const [removeStatus, setRemoveStatus] = useState(false);
  const [rejectStatus, setRejectStatus] = useState(false);
  
  const closePopup = () => {
    
   setApproveStatus(false);
   setRemoveStatus(false);
   setRejectStatus(false);
    setIsPopupOpen(false);
  };
  const openPopup = (id,status) => {
   if(status==="accepted"){
    setApproveStatus(true);
   }
   else if (status === 'rejected') {
    setRejectStatus(true);
   }  
   else   {
    setRemoveStatus(true);

   }
    setCourseReqID(id);
    setIsPopupOpen(true);
  };
  const [toastMessages, setToastMessages] = useState(location.state?.toastMessages || []); // S
  useEffect(() => {
    // Check if there are toast messages in the location state
    if (location.state?.toastMessages) {
      // Display the toast message
      const toastMessage = location.state.toastMessages[0]; // Assuming there's only one toast message
      setToastMessages([toastMessage]);

      // Clear the location state after showing the toast message
      setTimeout(() => {
        window.history.replaceState({}, document.title, window.location.pathname);
      }, 0);
    }
  }, [location.state]);
  useEffect(() => {
    const fetchData = async () => {
      setShowLoading2(true);
      try {
        const response = await facultyCourseManager.getAllCourses();
        if (response.success) {
          setCoursesReq(response.data);

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
        setShowLoading2(false);
      }
    };

    // Call fetchData function when component mounts
    fetchData();

    // Add dependencies if needed (e.g., studentToken, confirmPassword)
  }, []);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const allCourseData = coursesReq.map(course => ({
    courseReqId: course._id,
    stdName: course.studentId.name,
    courseTitle: course.courseId.courseName,
    creditHrs: course.courseId.courseCredHrs,
    status: course.status === 'accepted' ? 'registered' : course.status,

  }
  )
  );

  // const AttendanceData = [
  //   {
  //     stdname: "Moshu",
  //     courseTitle: "SDD",
  //     creditHrs: "2",
  //     status: "pending"
  //   },
  //   {
  //     stdname: "Hamza",
  //     courseTitle: "DSA",
  //     creditHrs: "2",
  //     status: "pending"
  //   },
  // ];

  const navigate = useNavigate();
  const handleStatusUpdate = async (courseReqId, status) => {
    try {
      setShowLoading(true);
      const response = await facultyCourseManager.updateCourseStatus(courseReqId, status);
      const updatedCoursesReq = coursesReq.map(course => {
        if (course._id === courseReqId) {
            // If the status was 'accepted', update it to 'registered'
            if (status === 'accepted') {
                return { ...course, status: 'registered' };
            }
            // If the status was 'rejected', keep it 'rejected'
            else if (status === 'rejected') {
                return { ...course, status: 'rejected' };
            }
            // If the status was 'removed', update it to 'removed'
            else{
                return { ...course, status: 'removed' };
            }
        }
        return course; // Return unchanged course if not the one being updated
    });
    setCoursesReq(updatedCoursesReq);
      if (response.success) {
        closePopup(false);
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

  return (
    <div className="flex-col">
      <div>
        <FacultyNavbar />
      </div>
      {showLoading2 && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Spinner />
        </div>
      )}
      <div className="w-full">
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
   
        {/* <div className="md:mt-10 md:ml-14 mt-16 md:flex md:items-start md:justify-start">
          <span className="text-sa-maroon  font-bold text-[32px] md:text-[36px]">
              Dashboard
          </span>
        </div> */}
        <div className="md:mt-14 mt-10">
          <div className="flex justify-between mx-10 md:mx-24">
            <span className="text-sa-maroon font-bold text-[28px] md:text-[36px]">
              Course Request
            </span>

          </div>
          <div className="mb-20 overflow-x-auto mt-10 mx-10 md:ml-[6%] md:w-[90%] md:shadow-xl rounded-2xl ">
            <table className="table-fixed min-w-full bg-sa-pink w-[800px] md:w-[50vw] rounded-2xl">
              <thead>
                <tr className="border-b border-sa-grey">
                  <th className="p-0 py-5  border-r border-sa-grey w-[100px]">
                    #
                  </th>
                  <th className="p-0 py-5  border-r border-sa-grey">
                    Student Name
                  </th>
                  <th className="p-0 py-5  border-r border-sa-grey">
                    Course Title
                  </th>
                  <th className="p-0 py-5 border-r border-sa-grey">
                    Credit Hours
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
                {allCourseData.map((faculty, index) => (
                  <tr key={index} className="border-b border-sa-grey">
                    <td className="p-0 py-5  border-r border-sa-grey w-[100px]">
                      {index + 1}
                    </td>
                    <td className="p-0 py-5  border-r border-sa-grey">
                      <span
                        className="block w-full h-full overflow-hidden overflow-ellipsis"
                        style={{ wordWrap: "break-word" }}
                      >
                        {faculty.stdName}
                      </span>
                    </td>
                    <td className="p-0 py-5  border-r border-sa-grey">
                      <span
                        className="block w-full h-full overflow-hidden overflow-ellipsis"
                        style={{ wordWrap: "break-word" }}
                      >
                        {faculty.courseTitle}
                      </span>
                    </td>
                    <td className="p-0 py-5  border-r border-sa-grey">
                      <span
                        className="block w-full h-full overflow-hidden overflow-ellipsis"
                        style={{ wordWrap: "break-word" }}
                      >
                        {faculty.creditHrs}
                      </span>
                    </td>
                    <td className="p-0 py-5 border-r border-sa-grey">
  <div className="xl:inline-flex items-center justify-center w-full h-full  overflow-hidden overflow-ellipsis  rounded-lg border bg-sa-pink p-1" style={{ wordWrap: "break-word" }}>
    {faculty && faculty.status === 'rejected' ? (
      <button
        className=" lg:w-[55%] w-[88px]    h-full bg-[#198754] xl:ml-2 text-white  items-center gap-2 rounded-md py-2 lg:text-base text-sm hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 hover:text-gray-300 focus:relative"
        onClick={() => openPopup(faculty.courseReqId, 'accepted')}
      >
        Approve
        {/* {showLoading ? <Spinner /> : 'Approve'} */}
      </button>
    ) : (
      <>
        {faculty && faculty.status === 'registered' ? (
          <button
            className="  lg:w-[55%] w-[88px] h-full xl:mt-0 items-center rounded-md bg-orange-500 hover:scale-105 transition-all duration-300 ease-in-out  py-2.5 text-sm lg:text-base text-white hover:opacity-90 hover:text-gray-300 shadow-sm focus:relative"
            onClick={() => openPopup(faculty.courseReqId, 'removed')}
          >
            Remove
            {/* {showLoading ? <Spinner /> : 'Remove'} */}
          </button>
        ) : (
          <>
            <button
              className=" xl:w-[6rem] lg:w-[6rem]    h-full bg-[#198754] xl:ml-2 hover:scale-105 transition-all duration-300 ease-in-out text-white inline-flex items-center gap-2 rounded-md px-4 py-2 lg:text-base text-sm  hover:opacity-90 hover:text-gray-300 focus:relative"
              onClick={() => openPopup(faculty.courseReqId, 'accepted')}
            >
              Approve
              {/* {showLoading ? <Spinner /> : 'Approve'} */}
            </button>
            <div className="xl:border-l border-[1px] h-[30px] xl:border-solid xl:mx-3 xl:border-gray-300 hidden xl:block"></div>
            {/* <div className="xl:border-l xl:border-solid xl:mx-3 xl:border-sa-grey hidden xl:block"></div> */}
            <div className="border-b border-[1px] mx-5 mt-5 border-sa-grey block xl:hidden"></div>
            <button
              className="xl:w-[5rem] lg:w-[5rem] hover:scale-105 transition-all duration-300 ease-in-out  h-full inline-flex xl:mt-0 mt-5 items-center  rounded-md bg-[#d9534f] px-4 py-2 lg:text-base text-sm text-white  hover:opacity-90 hover:text-gray-300 shadow-sm focus:relative"
              onClick={() => openPopup(faculty.courseReqId, 'rejected')}
              style={{ wordWrap: "break-word" }}
            >
              Reject
              {/* {showLoading ? <Spinner /> : 'Reject'} */}
            </button>
          </>
        )}
      </>
    )}
  </div>
</td>

                    <td className="p-0 py-5 border-sa-grey">
    <span
        className={`block text-base w-full h-full overflow-hidden overflow-ellipsis font-semibold ${
            faculty.status === 'registered' ? 'text-green-600' :
            faculty.status === 'rejected' ? 'text-red-600' :
            faculty.status === 'removed' ? 'text-orange-500' :
            faculty.status === 'pending' ? 'text-sa-blue' :
            ''
        }`}
        style={{ wordWrap: "break-word" }}
    >
        {capitalizeFirstLetter(faculty.status)}
    </span>
</td>

                  </tr>
                ))}
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
              {approveStatus && (
  <p className="text-black text-filter-heading md:w-auto w-60 text-left">
    Are you sure you want to approve this course?
  </p>
)}

{rejectStatus && (
  <p className="text-black text-filter-heading md:w-auto w-60 text-left">
    Are you sure you want to reject this course?
  </p>
)}

{removeStatus && (
  <p className="text-black text-filter-heading md:w-auto w-60 text-left">
    Are you sure you want to remove this course?
  </p>
)}
              <div className="flex justify-end mt-6">
                <button
                  onClick={closePopup}
                  className="text-filter-heading hover:scale-105 transition-all duration-300 ease-in-out   hover:opacity-70 mr-4 border-2 border-gray-400 rounded-[9px] border-filter-heading py-1 px-6"
                >
                  Cancel
                </button>
                {approveStatus && (
  <button className="bg-green-700 hover:scale-105 transition-all duration-300 ease-in-out min-w-28 hover:opacity-70 text-white  rounded-[9px] py-3 md:py-2" onClick={() => handleStatusUpdate(courseReqID, "accepted")}>
          {showLoading ? <Spinner size="h-6 w-6"/> : 'Approve'}
  </button>
)}

{rejectStatus && (
  <button className="bg-red-500 hover:scale-105 transition-all duration-300 ease-in-out  hover:opacity-70 text-white min-w-28 rounded-[9px] py-3 md:py-2" onClick={() => handleStatusUpdate(courseReqID, "rejected")}>
                 {showLoading ? <Spinner size="h-6 w-6"/> : 'Reject'}

  </button>
)}

{removeStatus && (
  <button className="bg-orange-600 hover:scale-105 transition-all duration-300 ease-in-out  hover:opacity-70 text-white min-w-28 rounded-[9px] py-3 md:py-2" onClick={() => handleStatusUpdate(courseReqID, "removed")}>
                {showLoading ? <Spinner size="h-6 w-6"/> : 'Remove'}

  </button>
)}
              </div>
            </div>
          </div>
        )}
                <tr className="border-b-0">
                  <td className="md:py-16 py-16 border-r border-sa-grey w-[100px]"></td>
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

export default CourseApproval;
