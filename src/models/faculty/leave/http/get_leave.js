import facultyApiConstants from "../../../../constants/facultyconstants.js";
import { ListResponse } from "../../leave/leave_model/leave_model.js";

class GetLeaveManager {
  async getAll() {
    const url = facultyApiConstants.GET_LEAVE_DETAILS;
    const token = localStorage.getItem("facultyToken");


    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          //"Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });

      if (response.status === 401) {
        window.location.href = "/faculty/login";
        localStorage.removeItem("facultyToken");
        localStorage.removeItem("facultyEmail");
        localStorage.removeItem("facultyName");
        return null;
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
}

export default GetLeaveManager;
