import { Delete } from "@mui/icons-material";
import WebApiConstants from "../../../../constants/webconstants.js";
import { BaseResponse } from "../subsemailmodel/addsubmail.js";

class AddSubMails {
  async add(email) {
    const url = WebApiConstants.ADD_SUBSCRIPTION;
    const token = localStorage.getItem("websiteToken");
    const params = {
        email: email,
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

  async delete() {
    const url = WebApiConstants.DELETE_SUBSCRIPTION;
    const token = localStorage.getItem("websiteToken");
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: `${token}`,
        },
      });

      if (response.status === 401) {
        window.location.href = "/account/signin";
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

export default AddSubMails;