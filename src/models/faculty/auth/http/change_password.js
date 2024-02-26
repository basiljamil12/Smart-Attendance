
import facultyApiConstants from '../../../../constants/facultyconstants.js';
import { BaseResponseforReset } from '../authmodels/signinmodel.js';

class ChangeFacultyPassManager {
    async change(old_password,new_password) {
      const url = facultyApiConstants.CHANGE_PASSWORD;
      const params = {
        old_password: old_password,
        new_password: new_password,
      };
    const token = localStorage.getItem("facultyToken");

  
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

export default ChangeFacultyPassManager;