import FaceIdConstants from "../../../../constants/faceidconstants.js";
import { BaseResponse,FaceBaseResponse } from "../student_model/student_model.js";
class FaceIdManager {
  async create(studentId,  attachment ) {
    const url = FaceIdConstants.CREATE_FACEID;
    const token = localStorage.getItem("adminToken");

    const formData = new FormData();
    formData.append("studentId", studentId);
    formData.append("faceId", attachment);

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

  async delete(id) {
    const url = FaceIdConstants.DELETE_FACEID + id;
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
  async recognize(attachment,  courseId ) {
    const url = FaceIdConstants.RECOGNIZE_FACEID;
    const token = localStorage.getItem("adminToken");

    const formData = new FormData();
    formData.append("faceId", attachment);
    formData.append("courseId", courseId);

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
        return new FaceBaseResponse(responseBody);
      } else {
        const errorBody = await response.text();
        throw new Error(errorBody);
      }
    } catch (error) {
      throw new Error(error.toString());
    }
  }


}

export default FaceIdManager;
