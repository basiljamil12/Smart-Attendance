import facultyApiConstants from "../../../../constants/facultyconstants.js";
import { BaseResponse } from "../authmodels/signinmodel.js";

class FacultySignoutManager {
  async signout() {
    const url = ApiConstants.SIGN_OUT;
    const token = localStorage.getItem("facultyToken");
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`,
        },
            
      });
      console.log(response);

      if (response.status === 401) {
        
        window.location.href = "/adboard/signin";
        localStorage.removeItem("facultyToken");
        localStorage.removeItem("facultyEmail");
        localStorage.removeItem("facultyName");
        return;
      }

      if (response.ok) {
        const responseBody = await response.json();
        localStorage.removeItem("facultyToken");
        localStorage.removeItem("facultyEmail");
        localStorage.removeItem("facultyName");
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

export default FacultySignoutManager;
