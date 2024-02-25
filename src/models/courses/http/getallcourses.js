import { PartyMode } from "@mui/icons-material";
import CourseApiConstants from "../../../constants/courseconstant.js";
import { ListResponseForAllCourse,BaseResponse } from "../course_model/coursemodel.js";
class FacultyCourseManager {
      async getAllCourses() {
        const url = CourseApiConstants.GET_ALL_COURSE_REQ;
        const token = localStorage.getItem("facultyToken");
        try {
          const response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',

              Authorization: `Bearer ${token}`,
            },
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
            return new ListResponseForAllCourse(responseBody);
          } else {
            const errorBody = await response.text();
            throw new Error(errorBody);
          }
        } catch (error) {
          throw new Error(error.toString());
        }
      }

      async updateCourseStatus(courseReqId,status) {
    const url = `${CourseApiConstants.UPDATE_COURSE_REQ_STATUS}${courseReqId}`;
        
        // const url = `{CourseApiConstants.UPDATE_COURSE_REQ_STATUS}{courseReqId}`;
        console.log(url);
        const token = localStorage.getItem("facultyToken");
        const params = {
            status: status,
          };
      
          try {
            const response = await fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`,
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

export default FacultyCourseManager;
