import facultyApiConstants from "../../../../constants/facultyconstants.js";
import {BaseResponse} from '../authmodels/signinmodel.js';

class FacultyHttpManager {
    async login(email, password) {
      const url = facultyApiConstants.SIGN_IN;
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
          localStorage.removeItem("facultyToken");
          localStorage.removeItem("facultyEmail");
          localStorage.removeItem("facultyName");
          window.location.href = "/faculty/login";
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

export default FacultyHttpManager;