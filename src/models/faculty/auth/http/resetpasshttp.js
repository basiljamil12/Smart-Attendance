import facultyApiConstants from "../../../../constants/facultyconstants.js";
import {BaseResponseforReset} from '../authmodels/signinmodel.js';

class ResetFacultyPassManager {
    async reset(facultyToken,new_password) {
      const url = facultyApiConstants.RESET_PASS;
      const params = {
        new_password: new_password,
      };
      const token = facultyToken
  
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`,
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
          return new BaseResponseforReset(responseBody);
        } else {
          const errorBody = await response.text();
          throw new Error(errorBody);
        }
      } catch (error) {
        throw new Error(error.toString());
      }
    }
  }

export default ResetFacultyPassManager;