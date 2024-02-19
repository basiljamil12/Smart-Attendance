import ApiConstants from "../../../../constants/adminconstants.js";
import { ListResponse, BaseResponse } from "../course_model/course_model.js";

class CourseCreateManager {
  async create(courseName,courseCode,courseCredHrs) {
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
            'Content-Type': 'application/json',
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
        console.log(responseBody);
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

export default CourseCreateManager;
