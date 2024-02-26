import StudentApiConstants from '../../../../constants/studentconstants.js';
import {BaseResponseforReset} from '../authmodels/signinmodel.js';

class ChangeStudentPassManager {
    async change(old_password,new_password) {
      const url = StudentApiConstants.CHANGE_PASSWORD;
      const params = {
        old_password: old_password,
        new_password: new_password,
      };
    const token = localStorage.getItem("studentToken");

  
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
          localStorage.removeItem("studentToken");
          localStorage.removeItem("studentEmail");
          localStorage.removeItem("studentName");
          window.location.href = "/student/login";
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

export default ChangeStudentPassManager;