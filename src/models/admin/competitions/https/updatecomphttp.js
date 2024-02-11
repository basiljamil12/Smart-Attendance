import ApiConstants from "../../../../constants/adminconstants.js";
import { BaseResponse } from "../compmodels/compmodel.js";

class UpdateCompManager {
  async update(
    forId,
    file,
    title,
    description,
    startDate,
    endDate,
    prizeAmount,
    prizeAmount2,
    prizeAmount3,
    culprit,
    isVisible,
    under18,
    suspects,
    cover,
    author,
    amount,
    linkToAuthor,
    is1Winner
  ) {
    const url = ApiConstants.UPDATE_COMP + "" + forId;
    const token = localStorage.getItem("userToken");

    const formData = new FormData();
    formData.append("book", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("start_date", new Date(startDate).toISOString());
    formData.append("end_date", new Date(endDate).toISOString());
    if (is1Winner) {
      formData.append("prize_amount", prizeAmount);
    } else {
      formData.append("prize_amount", prizeAmount);
      formData.append("prize_amount2", prizeAmount2);
      formData.append("prize_amount3", prizeAmount3);
    }
    formData.append("culprit", culprit);
    formData.append("is_visible_on_product_page", isVisible);
    formData.append("under_18_appropriate", under18);
    formData.append("suspects", JSON.stringify(suspects));
    formData.append("cover", cover);
    formData.append("author", author);
    formData.append("amount", amount);
    formData.append("link_to_author", linkToAuthor);
    formData.append("is_one_winner", is1Winner);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          token: token,
        },
        body: formData,
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

export default UpdateCompManager;
