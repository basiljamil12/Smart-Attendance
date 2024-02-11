import ApiConstants from "../../../../constants/webconstants.js";
import { BaseResponse } from "../authmodels/signinmodel.js";

class VerifyMailManager {
    async add(email, otp,) {
        const url = `${ApiConstants.VerifyMail}${email}&otp=${otp}`;
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(),
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

export default VerifyMailManager;