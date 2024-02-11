import ApiConstants from "../../../../constants/adminconstants.js";
import WebApiConstants from "../../../../constants/webconstants.js";
import { BaseResponse } from "../exportmodel/exportmodel.js";

class Export {
  async ExportEmailSub() {
    const url = ApiConstants.EXPORT_EMAIL_SUBS;
    const token = localStorage.getItem("userToken");
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          token: `${token}`,
        },
      });

      if (response.status === 401) {
        window.location.href = "/adboard/signin";
        return;
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

  async ExportListEntryByID(bookid) {
    const url = `${ApiConstants.EXPORT_LIST_ENTRY_BY_ID}${bookid}`;
    const token = localStorage.getItem("userToken");
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          token: `${token}`,
        },
      });

      if (response.status === 401) {
        window.location.href = "/adboard/signin";
        return;
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

  async ExportSalesListByID(bookid) {
    const url = `${ApiConstants.EXPORT_SALES_LIST_BY_ID}${bookid}`;
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
        window.location.href = "/adboard/signin";
        return;
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

  async Export_USERS() {
    const url = ApiConstants.EXPORT_USERS;
    const token = localStorage.getItem("userToken");
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          token: `${token}`,
        },
      });

      if (response.status === 401) {
        window.location.href = "/adboard/signin";
        return;
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

  async Export_CONT(bookid,user_id) {
    const url = `${ApiConstants.EXPORT_CONT}${bookid}&user_id=${user_id}`;
    const token = localStorage.getItem("userToken");
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          token: `${token}`,
        },
      });

      if (response.status === 401) {
        window.location.href = "/adboard/signin";
        return;
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

  async ExportWebsiteListEntryByID(bookid) {
    const url = `${WebApiConstants.export_entries_by_bookid}${bookid}`;
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
        const errorBody = await response.text();
        throw new Error(errorBody);
      }
    } catch (error) {
      throw new Error(error.toString());
    }
  }

  async ExportContByBookID(bookid) {
    const url = `${WebApiConstants.export_contribution_by_bookid}${bookid}`;
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
        window.location.href = "/adboard/signin";
        return;
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

export default Export;
