import ApiConstants from "../../../../constants/adminconstants.js";
import { ListResponse } from "../contmodels/contmodel.js";

class ContributionIdManager {
  async get(forId) {
    const url = ApiConstants.GET_CONT_ID + '' + forId;
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

export default ContributionIdManager;