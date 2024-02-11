import ApiConstants from "../../../../constants/webconstants.js";
import { BaseResponse } from "../authmodels/signinmodel.js";

class AddUserManager {
    async add(email, password, username,isEmailSubscribed) {
      const url = ApiConstants.ADD_User;
      const params = {
        email: email,
        password: password,
        username: username,
        is_email_subscribed:isEmailSubscribed,
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

export default AddUserManager;