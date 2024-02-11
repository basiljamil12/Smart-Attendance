import WebApiConstants from "../../../../constants/webconstants.js";
import { BaseResponse } from "../salesmodels/salesmodel.js";

class CheckPromoValid {
  async get(forId, promo) {
    const url = WebApiConstants.check_promo + "" + forId + "&text=" + promo;
    try {
      const response = await fetch(url, {
        method: "GET",
      });

      if (response.status === 401) {
        localStorage.removeItem("websiteToken");
        localStorage.removeItem("websiteEmail");
        localStorage.removeItem("websiteUsername");
        localStorage.removeItem("WebisEmailSubscribed");
        // Handle unauthorized access here, e.g., redirect to login page
        window.location.href = "/account/signin"; // Update to your actual path
        return; // Stop further execution
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

export default CheckPromoValid;
