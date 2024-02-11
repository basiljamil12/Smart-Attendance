import ApiConstants from "../../../../constants/adminconstants.js";
import {ListWinnerResponse } from "../winnermodels/winnermodel.js";

class GetWinner {
  async get(book_id) {
    const url = ApiConstants.GET_WINNER + '' + book_id;
    const token = localStorage.getItem("userToken");
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: `${token}`,
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
        return new ListWinnerResponse(responseBody);
      } else {
        const errorBody = await response.text();
        throw new Error(errorBody);
      }
    } catch (error) {
      throw new Error(error.toString());
    }
  }
}

export default GetWinner;