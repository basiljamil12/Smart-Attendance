import ApiConstants from "../../../../constants/adminconstants.js";
import { BaseResponse } from "../winnermodels/winnermodel.js";

class ChangeWinner {
  async put(book_id, entry_ids) {
    if (typeof entry_ids === 'string') {
      entry_ids = [entry_ids];
    }
    const url = ApiConstants.PUT_WINNER;
    const params = {
        book_id: book_id,
        entry_ids: entry_ids,
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

export default ChangeWinner;