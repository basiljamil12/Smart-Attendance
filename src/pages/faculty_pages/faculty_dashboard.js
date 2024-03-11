import React, { useState, useEffect } from "react";
import FacultyNavbar from "../../components/navbars/faculty_navbar";
import GetFacultyCourseManager from "../../models/courses/http/getCourseByFaculty";
import { useNavigate,useLocation, } from "react-router";
import Toast from "../../components/toast/toast";
import Spinner from "../../components/spinner/spinner";
import AttendanceManager from "../../models/attendance/http/get_attendance";

function FacultyDashboard() {
  const attendanceManager = new AttendanceManager();
  const [isAttendanceMarkedDashboard, setisAttendanceMarkedDashboard] = useState([false]); //

  const [facultyData, setFacultyData] = useState(null);
  const [courseID, setcourseID] = useState(null);
  const [showLoading, setShowLoading] = useState(false);
  const location = useLocation(); 
  const [toastMessages, setToastMessages] = useState(location.state?.toastMessages || []); // Set initial toastMessages from location state

  
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

  const getFacultyCourseManager = new GetFacultyCourseManager();
  useEffect(() => {
    const fetchData = async () => {
      setShowLoading(true);
      try {
        const response = await getFacultyCourseManager.get();
        if (response.success) {
          setFacultyData(response.data);
          const attendanceStatus = {}; // Object to store attendance status for each course

          for (const course of response.data) {
            const courseId = course._id;
            const attendanceResponse = await attendanceManager.getByDate(courseId);
            if (attendanceResponse.success) {
              attendanceStatus[courseId] = true; // Attendance marked for this course
            } else {
              attendanceStatus[courseId] = false; // Attendance not marked for this course
            }
          }
          
          setisAttendanceMarkedDashboard(attendanceStatus); // Set state with attendance status object
  
        //   console.log(response.data);

        //   if (response.data.length > 0) {
        //     // Accessing the first item in the array and extracting its _id
        //     const courseId = response.data[0]._id;
        //     setcourseID(courseId);
        // }
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

    fetchData();
  }, []);
//   useEffect(() => {
//     if (courseID) {
//       const firstFetchData = async () => {
//           setShowLoading(true);
//           try {
//               const response = await attendanceManager.getByDate(courseID);
//               if (response.success) {
//                 setisAttendanceMarkedDashboard(true);
//               } else {
//                 setisAttendanceMarkedDashboard(false);
//               }
//           } catch (error) {
//               setToastMessages([
//                   ...toastMessages,
//                   {
//                       type: "invalid",
//                       title: "Error",
//                       body: error.message,
//                   },
//               ]);
//           } finally {
//               setShowLoading(false);
//           }
//       };

//       firstFetchData();
//     }
// }, [courseID]);
  const AttendanceData = facultyData ? facultyData.map(data => ({
    
        courseId: data._id,
        courseCode: data.courseCode,
        courseTitle: data.courseName,
        creditHrs: data.courseCredHrs,
      })) : [];

  // const AttendanceData = [
  //   {
  //     courseCode:"ABC-112",
  //     courseTitle: "SDD",
  //     creditHrs: "2",
      
  //   }
  // ];

  const navigate = useNavigate();

  const handleMarkAttendance = (courseId) => {
    navigate(`/faculty/course/mark-attendance?courseId=${courseId}`); // Include courseId in the URL
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
        {/* <div className="md:mt-10 md:ml-14 mt-16 md:flex md:items-start md:justify-start">
          <span className="text-sa-maroon  font-bold text-[32px] md:text-[36px]">
              Dashboard
          </span>
        </div> */}
        <div className="md:mt-14 mt-10">
          <div className="flex justify-between mx-10 md:mx-24">
            <span className="text-sa-maroon font-bold text-[28px] md:text-[36px]">
            Dashboard
            </span>
            
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
              {facultyData && AttendanceData.map((faculty, index) => (
                  <tr key={index} className="border-b border-sa-grey">
                    <td className="p-0 py-5  border-r border-sa-grey w-[100px]">
                      {index + 1}
                    </td>
                    <td className="p-0 py-5  border-r border-sa-grey">
                      <span
                        className="block w-full h-full overflow-hidden overflow-ellipsis"
                        style={{ wordWrap: "break-word" }}
                      >
                        {faculty.courseCode}
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
                   
                    {/* <td className="p-0 py-5  border-sa-grey">
                      <span
                        className="block cursor-pointer transition-opacity hover:opacity-70 text-sa-table-blue w-full h-full underline overflow-hidden overflow-ellipsis"
                        style={{ wordWrap: "break-word" }}
                      >
                      Mark Attendance
                      </span>
                    </td> */}
                    <td className="p-2 py-5  border-sa-grey">
                    <div  class="lg:inline-flex rounded-lg border  bg-sa-pink p-1">
                   
                    <button
    className={`inline-flex items-center gap-2 rounded-md px-3 py-3 text-white md:text-base text-sm hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 hover:text-gray-300 focus:relative ${isAttendanceMarkedDashboard[faculty.courseId] ? ' bg-orange-600' : 'bg-sa-maroon'}`}
    onClick={() => handleMarkAttendance(faculty.courseId)} 
>
    {isAttendanceMarkedDashboard[faculty.courseId] ? "Edit Attendance" : "Mark Attendance"}
</button>


  
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

export default FacultyDashboard;
