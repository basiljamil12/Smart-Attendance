import ApiConstants from "../../../../constants/adminconstants.js";
import { BaseResponse, ListResponse } from "../authmodels/signinmodel.js";

class ListManager {
  async get() {
    const url = ApiConstants.LIST_ADMINS;
    const token = localStorage.getItem("userToken");
    try {
      const response = await fetch(url, {
        method: "GET",
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
        return new ListResponse(responseBody);
      } else {
        const errorBody = await response.text();
        throw new Error(errorBody);
      }
    } catch (error) {
      throw new Error(error.toString());
    }
  }
}

export default ListManager;
