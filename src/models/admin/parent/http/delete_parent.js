import ApiConstants from "../../../../constants/adminconstants.js";
import { ListResponse, BaseResponse } from "../parent_model/parent_model.js";

class DeleteParentManager {
  async delete(id) {
    const url = ApiConstants.DELETE_PARENT + id;
    const token = localStorage.getItem("adminToken");
    try {
      const response = await fetch(url, {
        method: "DELETE",
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

export default DeleteParentManager;
