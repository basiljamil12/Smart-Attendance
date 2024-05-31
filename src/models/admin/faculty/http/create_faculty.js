
import ApiConstants from "../../../../constants/adminconstants.js";
import { ListResponse, BaseResponse } from "../faculty_model/faculty_model.js";

class CreateFacultyManager {
    async create(name,email,password,contactno,isStudentAdvisor) {
        const url = ApiConstants.CREATE_FACULTY;
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
                'Content-Type': 'application/json',
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

export default CreateFacultyManager;

