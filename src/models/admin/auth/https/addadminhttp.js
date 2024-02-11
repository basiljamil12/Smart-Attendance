import ApiConstants from "../../../../constants/adminconstants.js";
import { BaseResponse } from "../authmodels/signinmodel.js";

class AddAdminManager {
    async add(email, password, username) {
      const url = ApiConstants.ADD_ADMIN;
      const token = localStorage.getItem("userToken");
      const params = {
        email: email,
        password: password,
        username: username,
      };
  
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            token: `${token}`,
          },
          body: JSON.stringify(params),
        });

        if (response.status === 401) {
          
          window.location.href = "/adboard/signin";
          localStorage.removeItem("userToken");
          localStorage.removeItem("email");
          localStorage.removeItem("username");
          return;
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

export default AddAdminManager;