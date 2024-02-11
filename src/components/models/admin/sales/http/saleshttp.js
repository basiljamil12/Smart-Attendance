import ApiConstants from "../../../../constants/adminconstants.js";
import {SalesAPIResponse} from "../salesmodel/salesmodel.js";
class SalesList {
  
  async getbyid(id) {
    
    const url = `${ApiConstants.GET_SALES_BY_ID}${id}`;
    const token = localStorage.getItem("userToken");
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          token: `${token}`,
        },
      });
      if (response.status === 401) {
        localStorage.removeItem("userToken");
        localStorage.removeItem("email");
        localStorage.removeItem("username");
        // Handle unauthorized access here, e.g., redirect to login page
        window.location.href = "/adboard/signin";
        // Update to your actual path
        return; // Stop further execution
      }
      if (response.ok) {
        const responseBody = await response.json();
  
        return new SalesAPIResponse(responseBody);
      } else {
        const errorBody = await response.json();
        throw new Error(errorBody.message);
      }
    } catch (error) {
      throw new Error(`Error in HTTP request: ${error.toString()}`);
    }
  }
}

export default SalesList;
