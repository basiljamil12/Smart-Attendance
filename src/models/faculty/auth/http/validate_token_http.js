import facultyApiConstants from "../../../../constants/facultyconstants.js";
import { BaseResponse } from "../authmodels/signinmodel.js";

class FacultyValidateTokenManager {
  
  async getFacultyValidation(facultyToken) {
    const url = facultyApiConstants.VALIDATE_TOKEN;
    const token = facultyToken;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        window.location.href = "/faculty/login";
        localStorage.removeItem("facultyToken");
        localStorage.removeItem("facultyEmail");
        localStorage.removeItem("facultyName");
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

export default FacultyValidateTokenManager;

