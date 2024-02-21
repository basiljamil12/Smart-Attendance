import StudentApiConstants from "../../../../constants/studentconstants.js";
import { BaseResponse } from "../authmodels/signinmodel.js";

class StudentValidateTokenManager {
    async getStudentValidation(studentToken) {
        const url = StudentApiConstants.VALIDATE_TOKEN;
        const token = studentToken;
        try {
          const response = await fetch(url, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          if (response.status === 401) {
       console.log(token);

            window.location.href = "/student/login";
            localStorage.removeItem("studentToken");
            localStorage.removeItem("studentEmail");
            localStorage.removeItem("studentName");
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

export default StudentValidateTokenManager;
