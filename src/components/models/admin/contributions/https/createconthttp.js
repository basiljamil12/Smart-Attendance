import ApiConstants from "../../../../constants/adminconstants.js";
import { BaseResponse } from "../contmodels/contmodel.js";

class AddContributionManager {
  async addFromAccount(email) {
    const url = `${ApiConstants.ADD_CONT_FROM_ACC}?email=${email}`;
    const token = localStorage.getItem("userToken");

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: `${token}`,
        },
        body: "",
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
        return new BaseResponse(responseBody);
      } else {
        const errorBody = await response.text();
        throw new Error(errorBody);
      }
    } catch (error) {
      throw new Error(error.toString());
    }
  }

  

  async add(user_id, percentage, is_owner, book_id) {
    const url = ApiConstants.ADD_CONT;
    const token = localStorage.getItem("userToken");
    const params = {
      user_id: user_id,
      percentage: percentage,
      is_owner: is_owner,
      book_id: book_id,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: `${token}`,
        },
        body: JSON.stringify(params),
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

export default AddContributionManager;
