
import ApiConstants from "../../../../constants/webconstants.js";
import {BaseResponse} from '../authmodels/signinmodel.js';
import { useNavigate } from 'react-router-dom';

class SignInManager {
  constructor(props) {
    // If you don't need to do anything in the constructor, you can omit it.
    // The constructor will be automatically created if it's not explicitly defined.
  }
    async login(email, password) {
      const url = ApiConstants.signin;
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
          localStorage.removeItem("websiteToken");
          localStorage.removeItem("websiteEmail");
          localStorage.removeItem("websiteUsername");
          localStorage.removeItem("WebisEmailSubscribed");
          // Handle unauthorized access here, e.g., redirect to login page
          window.location.href = "/account/signin"; // Update to your actual path
          return; // Stop further execution
        }
        if (response.status === 403) {
          // Handle unauthorized access here, e.g., redirect to login page
          const responseBody = await response.json();
          return new BaseResponse(responseBody);
           // Stop further execution
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

  export default SignInManager; 