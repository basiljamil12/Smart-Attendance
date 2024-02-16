import StudentApiConstants from "../../../../constants/studentconstants.js";
import { BaseResponse } from "../authmodels/signinmodel.js";

class StudentSignoutManager {
  async signout() {
    const url = StudentApiConstants.SIGN_OUT;
    const token = localStorage.getItem("studentToken");
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
            
      });
      console.log(response);

      if (response.status === 401) {
        
        window.location.href = "/adboard/signin";
        localStorage.removeItem("studentToken");
        localStorage.removeItem("studentEmail");
        localStorage.removeItem("studentName");
        return;
      }

      if (response.ok) {
        const responseBody = await response.json();
        localStorage.removeItem("studentToken");
        localStorage.removeItem("studentEmail");
        localStorage.removeItem("studentName");
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

export default StudentSignoutManager;
