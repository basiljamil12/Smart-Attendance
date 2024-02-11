import ApiConstants from "../../../../constants/adminconstants.js";
import { BaseResponse } from "../miscmodel/miscmodel.js";

class FooterManager {
    async add(type, text) {
      const url = ApiConstants.FOOTER;
      const token = localStorage.getItem("userToken");
      const params = {
        type: type,
        text: text,
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
          localStorage.removeItem("userToken");
          localStorage.removeItem("email");
          localStorage.removeItem("username");
          window.location.href = "/adboard/signin";
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

export default FooterManager;