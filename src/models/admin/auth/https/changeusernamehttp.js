import ApiConstants from "../../../../constants/adminconstants.js";
import { BaseResponse } from "../authmodels/signinmodel.js";

class ChangeUsernameManager {
  async put(username) {
    const url = ApiConstants.CHANGE_USERNAME;
    const params = {
      username: username,
    };
    const token = localStorage.getItem("userToken");
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: `${token}`,
        },
        body: JSON.stringify(params),
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

export default ChangeUsernameManager;
