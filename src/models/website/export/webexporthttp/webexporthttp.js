import WebApiConstants from "../../../../constants/webconstants.js";
import { BaseResponse } from "../webexportmodel/webexportmodel.js";

class Export {

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
