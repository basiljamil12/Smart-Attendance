import CourseApiConstants from "../../../constants/courseconstant.js";
import { ListResponseForFacultyCourse,BaseResponseForFacultyCourse,BaseResponse ,ListResponse} from "../course_model/coursemodel.js";
class GetFacultyCourseManager {
      async get() {
        const url = CourseApiConstants.GET_COURSES_BY_TEACHER;
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

            return new BaseResponseForFacultyCourse(responseBody);
          } else {
            const errorBody = await response.text();
            throw new Error(errorBody);
          }
        } catch (error) {
          throw new Error(error.toString());
        }
      }
      async getbyId(id) {
        const url = CourseApiConstants.GET_COURSE_BY_ID+id;
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

            return new BaseResponseForFacultyCourse(responseBody);
          } else {
            const errorBody = await response.text();
            throw new Error(errorBody);
          }
        } catch (error) {
          throw new Error(error.toString());
        }
      }
    
}

export default GetFacultyCourseManager;
