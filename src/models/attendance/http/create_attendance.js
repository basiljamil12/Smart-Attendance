import CourseApiConstants from "../../../constants/courseconstant.js";
import {
  BaseResponse,
  ListResponse,
} from "../attendance_model/attendance_model.js";
import attendanceApiConstants from "../../../constants/attendanceconstants.js";

class CreateAttendanceManager {
  async create(courseId,attendance_hours,topics,attendance) {
    console.log("Attendance array:", attendance); 
    const url = attendanceApiConstants.CREATE_ATTENDANCE;
    const token = localStorage.getItem("facultyToken");
    const requestBody = {
      courseId,
      attendance_hours,
      topics,
      attendance
  };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody), 
      });

      // if (response.status === 401) {
      //   window.location.href = "/student/login";
      //   localStorage.removeItem("studentToken");
      //   localStorage.removeItem("studentEmail");
      //   localStorage.removeItem("studentName");
      //   return null;
      // }
      if (response.ok) {
        const responseBody = await response.json();
        return new BaseResponse(responseBody);
      } else {
        const errorBody = await response.text();
        throw new Error(errorBody);
      }
    } catch (error) {
      throw new Error(error.toString());
    }
  }
}

export default CreateAttendanceManager;
