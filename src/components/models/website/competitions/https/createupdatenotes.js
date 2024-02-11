import WebApiConstants from "../../../../constants/webconstants.js";
import {  BookByID  } from "../authmodels/compbookmodel.js";

class CreateEditNotes {
  async post(bookid,note) {
    const url = `${WebApiConstants.create_edit_notes}${bookid}`;
    const token = localStorage.getItem("websiteToken");
    const params = {
        note: note,
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
        return new BookByID(responseBody);
      } else {
        const errorBody = await response.text();
        throw new Error(errorBody);
      }
    } catch (error) {
      throw new Error(error.toString());
    }
  }

  async posttoget(bookid) {
    const url = `${WebApiConstants.create_edit_notes}${bookid}`;
    const token = localStorage.getItem("websiteToken");
   
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
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
        return new BookByID(responseBody);
      } else {
        const errorBody = await response.text();
        throw new Error(errorBody);
      }
    } catch (error) {
      throw new Error(error.toString());
    }
  }


}

export default CreateEditNotes;
