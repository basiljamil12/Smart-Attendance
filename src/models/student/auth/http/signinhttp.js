import StudentApiConstants from "../../../../constants/studentconstants.js";
import {BaseResponse} from '../authmodels/signinmodel.js';

class StudentHttpManager {
    async login(email, password) {
      const url = StudentApiConstants.SIGN_IN;
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
          localStorage.removeItem("studentToken");
          localStorage.removeItem("studentEmail");
          localStorage.removeItem("studentName");
          window.location.href = "/student/login";
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

export default StudentHttpManager;