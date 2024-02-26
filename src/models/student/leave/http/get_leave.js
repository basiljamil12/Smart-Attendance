import StudentApiConstants from "../../../../constants/studentconstants.js";
import { ListResponse, BaseResponse } from "../leave_model/leave_model.js";

class GetStudentLeaveManager {
  async get() {
    const url = StudentApiConstants.GET_STUDENT_LEAVE;
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
}

export default GetStudentLeaveManager;
