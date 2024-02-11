import WebApiConstants from "../../../../constants/webconstants.js";
import {  BookByID  } from "../authmodels/compbookmodel.js";

class BookByIDList {
  async get(id) {
    const url = `${WebApiConstants.get_competition_by_id}${id}`;
    const token = localStorage.getItem("websiteToken");
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          token: `${token}`,
        },
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
       
        return new BookByID(responseBody);
      } else {
        const errorBody = await response.json();
        throw new Error(errorBody.message);
      }
    } catch (error) {
      throw new Error(error.toString());
    }
  }
}

export default BookByIDList;
