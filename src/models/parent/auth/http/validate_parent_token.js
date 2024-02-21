import parentApiConstants from "../../../../constants/parentconstants.js";
import { BaseResponse } from "../authmodels/signinmodel.js";

class ParentValidateTokenManager {
    async getParentValidation(parentToken) {
        const url = parentApiConstants.VALIDATE_TOKEN;
        const token = parentToken;
        try {
          const response = await fetch(url, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          if (response.status === 401) {
       console.log(token);

            window.location.href = "/parent/login";
            localStorage.removeItem("parentToken");
            localStorage.removeItem("parentEmail");
            localStorage.removeItem("parentName");
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

export default ParentValidateTokenManager;
