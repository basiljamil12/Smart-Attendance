import parentApiConstants from "../../../../constants/parentconstants.js";
import { BaseResponse } from "../authmodels/signinmodel.js";

class ParentSignoutManager {
  async signout() {
    const url = parentApiConstants.SIGN_OUT;
    const token = localStorage.getItem("parentToken");
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
            
      });
      console.log(response);

      if (response.status === 401) {
        
        window.location.href = "/parent/login";
        localStorage.removeItem("parentToken");
        localStorage.removeItem("parentEmail");
        localStorage.removeItem("parentName");
        return;
      }

      if (response.ok) {
        const responseBody = await response.json();
        localStorage.removeItem("parentToken");
        localStorage.removeItem("parentEmail");
        localStorage.removeItem("parentName");
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

export default ParentSignoutManager;
