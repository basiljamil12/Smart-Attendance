import ApiConstants from "../../../../constants/webconstants.js";
import { BaseResponse } from "../authmodels/signinmodel.js";

class WebResetPass {
  async reset1(email,is_from_signup) {
    const url = ApiConstants.RESET_PASS_1;
    //const email = localStorage.getItem("email");
    const params = {
      email: email,
      is_from_signup:is_from_signup,
    };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      if (response.status === 401) {
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

  async reset2(otp, email) {
    const url = `${ApiConstants.RESET_PASS_2}${email}`;
    const params = {
      otp: otp,
    };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
  async reset3(email,password) {
    //const email = localStorage.getItem("email");
    const url = ApiConstants.RESET_PASS_3 + '' + email;
    const params = {
      password: password,
    };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      if (response.status === 401) {
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

export default WebResetPass;
