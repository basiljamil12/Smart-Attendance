import facultyApiConstants from "../../../../constants/facultyconstants.js";
import { BaseResponse } from "../authmodels/facultymodel.js";

class FacultyDetailsManager {
  async get() {
    const url = facultyApiConstants.GET_DETAILS;
    const token = localStorage.getItem("facultyToken");
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`,
        },
            
      });
      console.log(response);

      if (response.status === 401) {
        
        window.location.href = "/faculty/login";
        localStorage.removeItem("facultyToken");
        localStorage.removeItem("facultyEmail");
        localStorage.removeItem("facultyName");
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

export default FacultyDetailsManager;
