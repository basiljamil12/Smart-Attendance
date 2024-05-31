
import parentApiConstants from "../../../../constants/parentconstants.js";
import { BaseResponse } from "../authmodels/signinmodel.js";

class ParentDetailsManager {
  async get() {
    const url = parentApiConstants.GET_PARENT_DETAILS;
    const token = localStorage.getItem("parentToken");
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`,
        },
            
      });

      if (response.status === 401) {
        
        window.location.href = "/parent/login";
        localStorage.removeItem("parentToken");
        localStorage.removeItem("parentEmail");
        localStorage.removeItem("parentName");
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

export default ParentDetailsManager;
