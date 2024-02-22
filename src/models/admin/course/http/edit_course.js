import ApiConstants from "../../../../constants/adminconstants.js";
import { ListResponse, BaseResponse } from "../course_model/course_model.js";

class EditCourseManager {
  async edit(id, courseName, courseCode, courseCredHrs, courseTeacher) {
    const url = ApiConstants.EDIT_COURSE + id;
    const params = {
      courseName: courseName,
      courseCode: courseCode,
      courseCredHrs: courseCredHrs,
      courseTeacher: courseTeacher,
    };
    const token = localStorage.getItem("adminToken");
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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

export default EditCourseManager;
