import { PartyMode } from "@mui/icons-material";
import CourseApiConstants from "../../../../constants/courseconstant.js";
import { BaseResponse,ListResponse } from "../authmodels/coursemodel.js";

class StudentCourseManager {
    async createCourse(courseId,status) {
        const url = CourseApiConstants.CREATE_COURSE_REQ;
        const token = localStorage.getItem("studentToken");
        const params = {
            courseId: courseId,
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

            window.location.href = "/student/login";
            localStorage.removeItem("studentToken");
            localStorage.removeItem("studentEmail");
            localStorage.removeItem("studentName");
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
      async getStudentCourses() {
        const url = CourseApiConstants.GET_STUDENT_COURSE_REQ;
        const token = localStorage.getItem("studentToken");
        try {
          const response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',

              Authorization: `Bearer ${token}`,
            },
          });
    
          if (response.status === 401) {

            window.location.href = "/student/login";
            localStorage.removeItem("studentToken");
            localStorage.removeItem("studentEmail");
            localStorage.removeItem("studentName");
            return null;
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
}

export default StudentCourseManager;
