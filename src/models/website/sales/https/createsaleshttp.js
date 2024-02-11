import WebApiConstants from "../../../../constants/webconstants.js";
import { BaseSalesResponse } from "../salesmodels/salesmodel.js";

class CreateSales {
  async create(book_id, paypal_order_id, payment_type, promocode_id) {
    const url = WebApiConstants.create_sales;
    const token = localStorage.getItem("websiteToken");
    const params = {
        book_id: book_id,
        paypal_order_id: paypal_order_id,
        payment_type: payment_type,
        promocode_id: promocode_id,
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
        return new BaseSalesResponse(responseBody);
      } else {
        const errorBody = await response.text();
        throw new Error(errorBody);
      }
    } catch (error) {
      throw new Error(error.toString());
    }
  }
}

export default CreateSales;