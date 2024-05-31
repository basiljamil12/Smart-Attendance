import ApiConstants from "../../../../constants/adminconstants.js";
import { ListResponse, BaseResponse } from "../course_model/course_model.js";

class CourseManager {
  async create(courseName, courseCode, courseCredHrs) {
    const url = ApiConstants.CREATE_COURSE;
    const params = {
      courseName: courseName,
      courseCode: courseCode,
      courseCredHrs: courseCredHrs,
    };
    const token = localStorage.getItem("adminToken");
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(params),
      });

      if (response.status === 401) {
        window.location.href = "/adboard/signin";
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminEmail");
        localStorage.removeItem("adminName");
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
  async getAll(user) {
    const url = ApiConstants.GET_ALL_COURSE;
    // const token = localStorage.getItem("adminToken");
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        if(user=="admin")
        {
        window.location.href = "/adboard/signin";
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminEmail");
        localStorage.removeItem("adminName");
      }
      if(user=="faculty")
        {
        window.location.href = "/faculty/login";
        localStorage.removeItem("facultyToken");
        localStorage.removeItem("facultyEmail");
        localStorage.removeItem("facultyName");
      }
      if(user=="student")
      {
      window.location.href = "/student/login";
      localStorage.removeItem("studentToken");
      localStorage.removeItem("studentEmail");
      localStorage.removeItem("studentName");
    }
        return null;
      }
      if (response.ok) {
        const responseBody = await response.json();
        return (responseBody);
      } else {
        const errorBody = await response.text();
        throw new Error(errorBody);
      }
    } catch (error) {
      throw new Error(error.toString());
    }
  }
  async get(id) {
    const url = ApiConstants.GET_COURSE + id;
    const token = localStorage.getItem("adminToken");
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        window.location.href = "/adboard/signin";
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminEmail");
        localStorage.removeItem("adminName");
        return null;
      }
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

export default CourseManager;
