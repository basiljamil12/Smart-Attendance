import StudentApiConstants from '../../../../constants/studentconstants.js';
import {BaseResponseforReset} from '../authmodels/signinmodel.js';

class ResetStudentPassManager {
    async reset(studentToken,new_password) {
      const url = StudentApiConstants.RESET_PASS;
      const params = {
        new_password: new_password,
      };
      const token = studentToken
  
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

export default ResetStudentPassManager;