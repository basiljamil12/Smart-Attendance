import ApiConstants from "../../../../constants/adminconstants.js";
import { ListResponse, BaseResponse } from "../faculty_model/faculty_model.js";

class FacultyManager {
  async getAll() {
    const url = ApiConstants.GET_ALL_FACULTY;
    const token = localStorage.getItem("adminToken");
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        window.location.href = "/adboard/signin";
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminEmail");
        localStorage.removeItem("adminName");
        return null;
      }
      if (response.ok) {
        const responseBody = await response.json();
        console.log(responseBody);
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

export default FacultyManager;
