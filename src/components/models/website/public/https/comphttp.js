import WebApiConstants from "../../../../constants/webconstants.js";
import { BaseResponse, AllCompBook } from "../authmodels/compmodel.js";

class AllCompList {
  
  async get() {
    const url = WebApiConstants.get_all_competitions;
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
        return new AllCompBook(responseBody);
      } else {
        const errorBody = await response.text();
        throw new Error(errorBody);
      }
    } catch (error) {
      throw new Error(error.toString());
    }
  }

  async getRecent() {
    const url = WebApiConstants.get_recent_two_competitions; // Replace with the actual API endpoint for recent competitions
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
        return new AllCompBook(responseBody);
      } else {
        const errorBody = await response.text();
        throw new Error(errorBody);
      }
    } catch (error) {
      throw new Error(error.toString());
    }
  }
  
  async getbyid(id) {
    const url = `${WebApiConstants.public_get_book_by_id}${id}`;
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
      throw new Error(error.toString());
    }
  }

  async getfooter()
  { 
    const url = `${WebApiConstants.footer}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
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
      return new AllCompBook(responseBody);
    } else {
      const errorBody = await response.json();
      throw new Error(errorBody.message);
    }
  } catch (error) {
    throw new Error(error.toString());
  }
  }

  async add(email) {
    const url = `${WebApiConstants.ADD_SUBS}${email}`;
    const params = {
      email: email,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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

  
}

export default AllCompList;
