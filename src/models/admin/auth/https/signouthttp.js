import ApiConstants from "../../../../constants/adminconstants.js";
import { BaseResponse } from "../authmodels/signinmodel.js";

class SignoutManager {
  async signout() {
    const url = ApiConstants.SIGN_OUT;
    const token = localStorage.getItem("userToken");
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          token: `${token}`,
        },
      });

      if (response.status === 401) {
        
        window.location.href = "/adboard/signin";
        localStorage.removeItem("userToken");
        localStorage.removeItem("email");
        localStorage.removeItem("username");
        return;
      }

      if (response.ok) {
        const responseBody = await response.json();
        localStorage.removeItem("userToken");
        localStorage.removeItem("email");
        localStorage.removeItem("username");
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

export default SignoutManager;
