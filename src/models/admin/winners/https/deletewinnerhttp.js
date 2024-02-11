import ApiConstants from "../../../../constants/adminconstants.js";
import { BaseResponse } from "../winnermodels/winnermodel.js";

class DeleteWinner {
  async delete(book_id) {
    const url = ApiConstants.DELETE_WINNER + '' + book_id;
    const token = localStorage.getItem("userToken");
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
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

export default DeleteWinner;