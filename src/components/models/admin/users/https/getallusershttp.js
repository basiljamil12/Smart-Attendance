import ApiConstants from "../../../../constants/adminconstants.js";
import {
  ActivityResponse,
  ActivityResponse2,
  ListResponse,
  AllResponse,
} from "../usermodels/usermodel.js";

class AllUsersManager {
  async get(filter = null) {
    let url;
    if (filter === true) {
      url = `${ApiConstants.GET_ALL_USERS}?filter=${filter}`;
    } else if (filter === false) {
      url = `${ApiConstants.GET_ALL_USERS}?filter=${filter}`;
    } else {
      url = ApiConstants.GET_ALL_USERS;
    }
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
        return new AllResponse(responseBody);
      } else {
        const errorBody = await response.text();
        throw new Error(errorBody);
      }
    } catch (error) {
      throw new Error(error.toString());
    }
  }

  async getuserlist() {
    const url = ApiConstants.GET_USERS_LIST;
    const token = localStorage.getItem("userToken");
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: `${token}`,
        },
      });

      if (response.status === 401) {
        window.location.href = "/adboard/signin";
        return;
      }

      if (response.ok) {
        const responseBody = await response.json();
        return new ListResponse(responseBody);
      } else {
        const errorBody = await response.text();
        throw new Error(errorBody);
      }
    } catch (error) {
      throw new Error(error.toString());
    }
  }

  async getUsersActivity(id) {
    const url = `${ApiConstants.GET_USERS_ACTIVITY}${id}`;
    const token = localStorage.getItem("userToken");
    try {
      const response = await fetch(url, {
        method: "GET",
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
        return new ActivityResponse(responseBody);
      } else {
        const errorBody = await response.json();
        throw new Error(errorBody.message);
      }
    } catch (error) {
      throw new Error(`Error in HTTP request: ${error.toString()}`);
    }
  }

  async disableUser(email) {
    const url = `${ApiConstants.DISABLE_USER}${email}`;

    const token = localStorage.getItem("userToken");
    try {
      const response = await fetch(url, {
        method: "POST",
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
        return new ActivityResponse2(responseBody);
      } else {
        const errorBody = await response.json();
        throw new Error(errorBody.message);
      }
    } catch (error) {
      throw new Error(`Error in HTTP request: ${error.toString()}`);
    }
  }
}

export default AllUsersManager;
