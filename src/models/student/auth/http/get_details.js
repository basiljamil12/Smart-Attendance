
import StudentApiConstants from "../../../../constants/studentconstants.js";
import { BaseResponse } from "../authmodels/signinmodel.js";

class StudentDetailsManager {
  async get() {
    const url = StudentApiConstants.GET_STUDENT_DETAILS;
    const token = localStorage.getItem("studentToken");
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`,
        },
            
      });

      if (response.status === 401) {
        
        window.location.href = "/student/login";
        localStorage.removeItem("studentToken");
        localStorage.removeItem("studentEmail");
        localStorage.removeItem("studentName");
        return;
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

export default StudentDetailsManager;
