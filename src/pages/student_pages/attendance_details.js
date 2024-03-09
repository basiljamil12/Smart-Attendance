
import React, { useState, useEffect } from "react";

import StudentNavbar from "../../components/navbars/student_navbar";
import { useNavigate, useLocation } from "react-router";
import AttendanceManager from "../../models/attendance/http/get_attendance";
import Toast from "../../components/toast/toast";
import Spinner from "../../components/spinner/spinner";
function StudentAttendanceDetails() {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const forId = searchParams.get("courseId");
  const attendanceManager = new AttendanceManager();
  const [studentData, setStudentData] = useState(null);
  const [showLoading, setShowLoading] = useState(false);
  const [toastMessages, setToastMessages] = useState([]); // Set initial toastMessages from location state

  useEffect(() => {

    if (!forId) return; // Add a null check here
  
    const fetchData = async () => {
      setShowLoading(true);
      try {
        const response = await attendanceManager.getByCourseID(forId);
        console.log("Response:", response);

        if (response.success) {
          setStudentData(response.data);
          console.log("AB", response.data); // Update here
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
  }, [forId]);
  
  const AttendanceData = studentData ? [studentData].map(data => ({
    courseID: data?.courseId?._id,
    courseTitle: data?.courseId?.courseName,
    courseTeacher: data?.courseId?.courseTeacher,
    attendanceRecords: data?.attendance?.map(record => ({
      date: record?.date,
      topic: record?.topics,
      presenthrs: record?.present_hours,
      absenthrs: record?.absent_hours,
      hours: record?.hours,
    })),
    presentHours: data?.present_hours,
    absentHours: data?.absent_hours,
    totalHours: data?.total_hours,
  })) : [];
  const convertDateFormat = (startDate) => {
    const parsedDate = new Date(startDate);

    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedStartDate = parsedDate.toLocaleDateString("en-US", options);
    return formattedStartDate;
  };
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
  
        <div className="md:mt-14 mt-10">
          <div className="flex justify-between mx-10 md:mx-24">
            <span className="text-sa-maroon font-bold text-[28px] md:text-[36px]">
            Dashboard
            </span>
          
          </div>
          <div className="flex justify-start md:mt-10 mx-10 md:mx-24">
  <span className="text-sa-maroon font-bold text-xl">Course Title:</span>
  <span className="text-sa-black font-bold ml-2 text-xl">
    {AttendanceData && AttendanceData?.map((data, index) => (
      <span key={index}>{data?.courseTitle}</span>
    ))}
  </span>
</div>
<div className="flex justify-start md:mt-4 mx-10 md:mx-24">
  <span className="text-sa-maroon font-bold text-xl">Teacher Name:</span>
  <span className="text-sa-black font-bold ml-2 text-xl">
    {AttendanceData && AttendanceData?.map((data, index) => (
      <span key={index}>{data?.courseTeacher}</span>
    ))}
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
                    Date of Class
                  </th>
                  <th className="p-0 py-5  border-r border-sa-grey">
                    Topic of Class
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
                
                    </tr>
              </thead>
              <tbody>
              {AttendanceData && AttendanceData.map((faculty, index) => (
                  faculty?.attendanceRecords?.map((record, recordIndex) => (
                 <tr key={index} className="border-b border-sa-grey">
                    <td className="p-0 py-5  border-r border-sa-grey w-[100px]">
                      {recordIndex + 1}
                    </td>
                    <td className="p-0 py-5  border-r border-sa-grey">
                      <span
                        className="block w-full h-full overflow-hidden overflow-ellipsis"
                        style={{ wordWrap: "break-word" }}
                      >
                        {convertDateFormat(record?.date)}
                      </span>
                    </td>
                    <td className="p-0 py-5  border-r border-sa-grey">
                      <span
                        className="block w-full h-full overflow-hidden overflow-ellipsis"
                        style={{ wordWrap: "break-word" }}
                      >
                        {record?.topic}
                      </span>
                    </td>
                    <td className="p-0 py-5  border-r border-sa-grey">
                      <span
                        className="block w-full h-full overflow-hidden overflow-ellipsis"
                        style={{ wordWrap: "break-word" }}
                      >
                        {record?.presenthrs}
                      </span>
                    </td>
                    <td className="p-0 py-5  border-r border-sa-grey">
                      <span
                        className="block w-full h-full overflow-hidden overflow-ellipsis"
                        style={{ wordWrap: "break-word" }}
                      >
                        {record?.absenthrs}
                      </span>
                    </td>
                    <td className="p-0 py-5  border-r  border-sa-grey">
                      <span
                        className="block w-full h-full overflow-hidden overflow-ellipsis"
                        style={{ wordWrap: "break-word" }}
                      >
                        {record?.hours}
                      </span>
                    </td>
                  
                
                  </tr>
                  ))
                ))}
                <tr className="border-b-0">
                  <td className="md:py-32 py-16 border-r border-sa-grey w-[100px]"></td>
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

export default StudentAttendanceDetails;
