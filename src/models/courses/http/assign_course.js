
import facultyApiConstants from "../../../constants/facultyconstants.js";
import { BaseResponse,BaseResponseForAllCourse } from "../course_model/coursemodel.js";

class CourseAssignManager {
    async assign(courseID,facultyID) {
    const url = facultyApiConstants.ASSIGN_COURSE + courseID;
    console.log(courseID);

        const params = {
            courseTeacher: facultyID,
        };
        console.log(params);
        const token = localStorage.getItem("facultyToken");
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
            window.location.href = "/faculty/login";
            localStorage.removeItem("facultyToken");
            localStorage.removeItem("facultyEmail");
            localStorage.removeItem("facultyName");
            return null;
          }
          if (response.ok) {
            const responseBody = await response.json();
            return new BaseResponseForAllCourse(responseBody);
          } else {
            const errorBody = await response.text();
            throw new Error(errorBody);
          }
        } catch (error) {
          throw new Error(error.toString());
        }
      }
 
}

export default CourseAssignManager;

