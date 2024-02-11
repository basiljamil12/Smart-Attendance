import ApiConstants from "../../../../constants/adminconstants.js";
import { ListResponse } from "../compmodels/compmodel.js";

class ListCompNamesManager {
  async get() {
    const url = ApiConstants.LIST_COMP_NAMES;
    const token = localStorage.getItem("userToken");
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          token: `${token}`,
          'Content-Type' : 'application/json',
        },
      });

      if (response.status === 401) {
        localStorage.removeItem("userToken");
        localStorage.removeItem("email");
        localStorage.removeItem("username");
        window.location.href = "/adboard/signin";
        return null;
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

export default ListCompNamesManager;
