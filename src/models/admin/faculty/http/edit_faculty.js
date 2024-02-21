import ApiConstants from "../../../../constants/adminconstants.js";
import { ListResponse, BaseResponse } from "../faculty_model/faculty_model.js";

class EditFacultyManager {
  async edit(id, name, email, password, contactno, isStudentAdvisor) {
    const url = ApiConstants.EDIT_FACULTY + id;
    const params = {
      name: name,
      email: email,
      password: password,
      contactno: contactno,
      isStudentAdvisor: isStudentAdvisor,
    };
    const token = localStorage.getItem("adminToken");
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

  async editPassword(id, password) {
    const url = ApiConstants.EDIT_FACULTY_PASSWORD + id;
    const params = {
      new_password: password,
    };
    const token = localStorage.getItem("adminToken");
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

export default EditFacultyManager;
