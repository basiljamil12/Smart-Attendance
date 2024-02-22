import parentApiConstants from '../../../../constants/parentconstants.js';
import {BaseResponseforReset} from '../authmodels/signinmodel.js';

class ResetParentPassManager {
    async reset(parentToken,new_password) {
      const url = parentApiConstants.RESET_PASS;
      const params = {
        new_password: new_password,
      };
      const token = parentToken
  
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
          localStorage.removeItem("parentToken");
          localStorage.removeItem("parentEmail");
          localStorage.removeItem("parentName");
          window.location.href = "/parent/login";
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

export default ResetParentPassManager;