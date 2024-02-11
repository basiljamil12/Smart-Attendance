import WebApiConstants from "../../../../constants/webconstants.js";
import {  Entry  } from "../authmodels/entry.js";

class CreateEntry {
  async post(book_id,guess) {
    const url = `${WebApiConstants.create_entry}`;
    const token = localStorage.getItem("websiteToken");
    const params = {
        book_id: book_id,
        guess: guess,
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
        return new Entry(responseBody);
      } else {
        const errorBody = await response.json();
        throw new Error(errorBody.message);
      }
    } catch (error) {
      throw new Error(error.toString());
    }
  }


  async get(book_id) {
    const url = `${WebApiConstants.entry_status}${book_id}`;
   
    const token = localStorage.getItem("websiteToken");
  
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
          token: `${token}`,
        },
      });

      if (response.ok) {
        const responseBody = await response.json();
        return new Entry(responseBody);
      } else {
        const errorBody = await response.json();
        throw new Error(errorBody.message);
      }
    } catch (error) {
      throw new Error(error.toString());
    }
  }
}

export default CreateEntry;
