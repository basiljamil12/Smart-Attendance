import WebApiConstants from "../../../../constants/webconstants.js";
import { BaseResponse } from "../salesmodels/salesmodel.js";

class CreatePayment {
  async create(book_id, promo_code) {
    const url = WebApiConstants.create_payment;
    const token = localStorage.getItem("websiteToken");
    const params = {
        book_id: book_id,
        promo_code: promo_code,
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
        localStorage.removeItem("websiteToken");
        localStorage.removeItem("websiteEmail");
        localStorage.removeItem("websiteUsername");
        localStorage.removeItem("WebisEmailSubscribed");
        // Handle unauthorized access here, e.g., redirect to login page
        window.location.href = "/account/signin"; // Update to your actual path
        return null; // Stop further execution
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

export default CreatePayment;