import facultyApiConstants from "../../../../constants/facultyconstants.js";
import { BaseResponse, ListResponse } from "../leave_model/leave_model.js";

class UpdateLeaveManager {
  async update(id, status) {
    const url = facultyApiConstants.UPDATE_LEAVE_STATUS + id;
    const token = localStorage.getItem("facultyToken");
    const params = {
      status: status,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(params),
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
        console.log(responseBody);
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

export default UpdateLeaveManager;
