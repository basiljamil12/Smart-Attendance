import ApiConstants from "../../../../constants/adminconstants.js";
import {BaseResponse, ListResponse } from "../miscmodel/miscmodel.js";

class EmailManager {
    async get(bookId) {
      let url;
if (bookId){
  url = `${ApiConstants.GET_EMAIL_SUBS}?book_id=${bookId}`;
} else {
url = ApiConstants.GET_EMAIL_SUBS 
}
      const token = localStorage.getItem("userToken");
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            token: `${token}`,
          },
        });

        if (response.status === 401) {
          window.location.href = "/adboard/signin";
          return;
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

    async getusers() {
        const url = ApiConstants.GET_WEB_USERS;
        const token = localStorage.getItem("userToken");
        try {
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              token: `${token}`,
            },
          });
  
          if (response.status === 401) {
            window.location.href = "/adboard/signin";
            return;
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

    async post(email,subject,body) {
        const url = ApiConstants.SEND_MAIL;
        const token = localStorage.getItem("userToken");
        const params = {
            email: email,
            subject: subject,
            body: body,
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

      async unsubscribe(email) {
        const url = `${ApiConstants.UNSUBSCRIBE_MAIL}${email}`;
        console.log(url);
        //const url = ApiConstants.UNSUBSCRIBE_MAIL;
        const token = localStorage.getItem("userToken");
        const params = {
            //email: email,
          };
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
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

export default EmailManager;