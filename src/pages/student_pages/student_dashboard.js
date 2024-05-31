
import React, { useState, useEffect } from "react";
import StudentNavbar from "../../components/navbars/student_navbar";
import { useNavigate } from "react-router";
import AttendanceManager from "../../models/attendance/http/get_attendance";
import Toast from "../../components/toast/toast";
import Spinner from "../../components/spinner/spinner";
function StudentDashboard() {
  const attendanceManager = new AttendanceManager();
  const [studentData, setStudentData] = useState(null);
  const [showLoading, setShowLoading] = useState(false);
  const [toastMessages, setToastMessages] = useState([]); // Set initial toastMessages from location state

  useEffect(() => {
    const fetchData = async () => {
      setShowLoading(true);
      try {
        const response = await attendanceManager.getByStudent();
        if (response.success) {
          setStudentData(response.data);
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

  const AttendanceData = studentData ? studentData.map(data => ({
    courseID: data.courseId._id,
    courseTitle: data.courseId.courseName,
    courseTeacher: data.courseId.courseTeacher,
    presentHours: data.present_hours,
    absentHours: data.absent_hours,
    totalHours: data.total_hours,
  })) : [];
  const calculatePercentage = (presentHours, totalHours) => {

    const present = parseInt(presentHours);
    const total = parseInt(totalHours);

    if (total === 0 || isNaN(present) || isNaN(total)) {
      return "N/A";
    }

    return ((present / total) * 100).toFixed(2) + "%";
  };
  // const AttendanceData = [
  //   {
  //     courseTitle: "SDD",
  //     teacherName: "Ali",
  //     presentHrs: "20",
  //     absentHrs: "2",
  //     totalHrs: "48",
  //   },
  //   {
  //     courseTitle: "DSA",
  //     teacherName: "IBU",
  //     presentHrs: "25",
  //     absentHrs: "7",
  //     totalHrs: "48",
  //   },
  // ];

  const navigate = useNavigate();

  const handleDetails = (courseId) => {
    navigate(`/student/dashboard/details?courseId=${courseId}`);
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
      <div className="w-full">

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
                    Course Title
                  </th>
                  <th className="p-0 py-5  border-r border-sa-grey">
                    Teacher Name
                  </th>
                  <th className="p-0 py-5  border-r border-sa-grey">
                    Present Hours
                  </th>
                  <th className="p-0 py-5  border-r border-sa-grey">
                    Absent Hours
                  </th>
                  <th className="p-0 py-5  border-r border-sa-grey">
                    Total Hours
                  </th>
                  <th className="p-0 py-5  border-sa-grey">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {AttendanceData.map((faculty, index) => (
                  <tr key={index} className="border-b border-sa-grey">
                    <td className="p-0 py-5  border-r border-sa-grey w-[100px]">
                      {index + 1}
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
                        {faculty.courseTeacher}
                      </span>
                    </td>
                    <td className="p-0 py-5  border-r border-sa-grey">
                      <span
                        className="block w-full h-full overflow-hidden overflow-ellipsis"
                        style={{ wordWrap: "break-word" }}
                      >
                        {faculty.presentHours} ({calculatePercentage(faculty.presentHours, faculty.totalHours)})
                      </span>
                    </td>
                    <td className="p-0 py-5  border-r border-sa-grey">
                      <span
                        className="block w-full h-full overflow-hidden overflow-ellipsis"
                        style={{ wordWrap: "break-word" }}
                      >
                        {faculty.absentHours}
                      </span>
                    </td>
                    <td className="p-0 py-5  border-r  border-sa-grey">
                      <span
                        className="block w-full h-full overflow-hidden overflow-ellipsis"
                        style={{ wordWrap: "break-word" }}
                      >
                        {faculty.totalHours}
                      </span>
                    </td>

                    <td className="p-2 py-5  border-sa-grey">
                      <div class="lg:inline-flex rounded-lg border  bg-sa-pink p-1">

                        <button
                          class="bg-sa-maroon  text-white inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm  hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 hover:text-gray-300  focus:relative"
                          onClick={() => handleDetails(faculty.courseID)}

                        >
                          Go to Details
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

export default StudentDashboard;
