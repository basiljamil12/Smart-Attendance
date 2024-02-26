import ApiConstants from "../../../../constants/adminconstants.js";
import { ListResponse, BaseResponse } from "../leave_model/leave_model.js";

class CreateLeaveManager {
  async create(subject, fromDate, toDate, attachment, reason) {
    const url = ApiConstants.CREATE_LEAVE;
    const token = localStorage.getItem("studentToken");

    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("fromDate", fromDate);
    formData.append("toDate", toDate);
    formData.append("attachment", attachment);
    formData.append("reason", reason);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          //"Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
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

export default CreateLeaveManager;
