import WebApiConstants from "../../../../constants/webconstants.js";
import {  Contributions } from "../authmodels/authordashmodel.js";
import {ListResponse} from "../authmodels/authordashbyidmodel.js";
import { SalesAPIResponse } from "../../../admin/sales/salesmodel/salesmodel.js";
import { BaseResponse } from "../../../admin/entries/entrymodels/entriesmodel.js";

class ContributionsList {
  async get() {
    
    const url = `${WebApiConstants.contributions}`;
    const token = localStorage.getItem("websiteToken");
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          token: `${token}`,
        },
      });
      if (response.status === 401) {
        // Handle unauthorized access here, e.g., redirect to login page
        window.location.href = "/account/signin"; // Update to your actual path
        return; // Stop further execution
      }
      if (response.ok) {
        const responseBody = await response.json();
       
        return new Contributions(responseBody);
      } else {
        const errorBody = await response.json();
        throw new Error(errorBody.message);
      }
    } catch (error) {
      throw new Error(error.toString());
    }
  }


  async getbyid(id) {
    
    const url = `${WebApiConstants.contribution_by_id}${id}`;
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
  
        return new ListResponse(responseBody);
      } else {
        const errorBody = await response.json();
        throw new Error(errorBody.message);
      }
    } catch (error) {
      throw new Error(`Error in HTTP request: ${error.toString()}`);
    }
  }

  async getsalesbyid(id) {
    
    const url = `${WebApiConstants.get_sales_by_bookid}${id}`;
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
  
        return new SalesAPIResponse(responseBody);
      } else {
        const errorBody = await response.json();
        throw new Error(errorBody.message);
      }
    } catch (error) {
      throw new Error(`Error in HTTP request: ${error.toString()}`);
    }
  }


  async getcontbyid(id) {
    
    const url = `${WebApiConstants.entries_by_bookid}${id}`;
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
        return new BaseResponse(responseBody);
      } else {
        const errorBody = await response.json();
        throw new Error(errorBody.message);
      }
    } catch (error) {
      throw new Error(`Error in HTTP request: ${error.toString()}`);
    }
  }  

}

export default ContributionsList;
