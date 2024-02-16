import parentApiConstants from "../../../../constants/parentconstants.js";
import {BaseResponse} from '../authmodels/signinmodel.js';

class ParentHttpManager {
    async login(email, password) {
      const url = parentApiConstants.SIGN_IN;
      const params = {
        email: email,
        password: password,
      };
  
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
        });

        if (response.status === 401) {
          localStorage.removeItem("parentToken");
          localStorage.removeItem("parentEmail");
          localStorage.removeItem("parentName");
          window.location.href = "/parent/login";
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

export default ParentHttpManager;