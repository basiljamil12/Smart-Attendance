import CourseApiConstants from "../../../constants/courseconstant.js";
import {
  BaseResponse,
  ListResponse,
  ListResponseByStudent,
  BaseResponseByStudent
} from "../attendance_model/attendance_model.js";
import attendanceApiConstants from "../../../constants/attendanceconstants.js";

class AttendanceManager {
  async get(id) {
    const url = attendanceApiConstants.GET_ATT_BY_ID + id;
    const token = localStorage.getItem("studentToken");
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        window.location.href = "/student/login";
        localStorage.removeItem("studentToken");
        localStorage.removeItem("studentEmail");
        localStorage.removeItem("studentName");
        return null;
      }
      if (response.ok) {
        const responseBody = await response.json();
        return new ListResponse(responseBody);
      } else {
        const errorBody = await response.text();
        throw new Error(errorBody);
      }
    } catch (error) {
      throw new Error(error.toString());
    }
  }

  async getByStudent(fromParent) {
    let url;
    if (fromParent) {
      url = attendanceApiConstants.GET_ATTENDANCE_BY_PARENT;
    }
    else {
      url = attendanceApiConstants.GET_ATTENDANCE_BY_STUDENT;

    }
    console.log(url);
    let token;
    if (fromParent) {
      token = localStorage.getItem("parentToken");
    }
    else {
      token = localStorage.getItem("studentToken");
    }
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        if (fromParent) {
          window.location.href = "/parent/login";
          localStorage.removeItem("parentToken");
          localStorage.removeItem("parentEmail");
          localStorage.removeItem("parentName");
        }
        else {
          window.location.href = "/student/login";
          localStorage.removeItem("studentToken");
          localStorage.removeItem("studentEmail");
          localStorage.removeItem("studentName");
        }

        return null;
      }
      if (response.ok) {
        const responseBody = await response.json();
        return new ListResponseByStudent(responseBody);
      } else {
        const errorBody = await response.text();
        throw new Error(errorBody);
      }
    } catch (error) {
      throw new Error(error.toString());
    }
  }
  async getByCourseID(id) {
    const url = attendanceApiConstants.GET_ATTENDANCE_BY_COURSE_ID + id;

    const token = localStorage.getItem("studentToken");
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        window.location.href = "/student/login";
        localStorage.removeItem("studentToken");
        localStorage.removeItem("studentEmail");
        localStorage.removeItem("studentName");
        return null;
      }
      if (response.ok) {
        const responseBody = await response.json();
        console.log(responseBody);
        return new BaseResponseByStudent(responseBody);
      } else {
        const errorBody = await response.text();
        throw new Error(errorBody);
      }
    } catch (error) {
      throw new Error(error.toString());
    }
  }
}

export default AttendanceManager;
