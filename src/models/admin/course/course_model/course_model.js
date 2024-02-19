export class CourseData {
    constructor({ courseCode, courseName, courseCredHrs, studentsEnrolled, courseTeacher }) {
      this.courseCode = courseCode;
      this.courseName = courseName;
      this.courseCredHrs = courseCredHrs;
      this.studentsEnrolled = studentsEnrolled;
      this.courseTeacher = courseTeacher;
    }
  
    static fromJson(json) {
      return new CourseData({
        courseCode: json.courseCode,
        courseName: json.courseName,
        courseCredHrs: json.courseCredHrs,
        studentsEnrolled: json.studentsEnrolled,
        courseTeacher: json.courseTeacher,
      });
    }
  
    toJson() {
      return {
        courseCode: this.courseCode,
        courseName: this.courseName,
        courseCredHrs: this.courseCredHrs,
        studentsEnrolled: this.studentsEnrolled,
        courseTeacher: this.courseTeacher,
      };
    }
  }
  
  export class BaseResponse {
    constructor({ success, data, message }) {
      this.success = success;
      this.data = data ? new CourseData(data) : null;
      this.message = message;
    }
  
    static fromJson(json) {
      return new BaseResponse({
        success: json.success,
        data: json.data ? CourseData.fromJson(json.data) : null,
        message: json.message,
      });
    }
  
    toJson() {
      return {
        success: this.success,
        data: this.data ? this.data.toJson() : null,
        message: this.message,
      };
    }
  }
  
  export class ListResponse {
    constructor({ success, data, message }) {
      this.success = success;
      this.data = data ? data.map(user => new CourseData(user)) : null;
      this.message = message;
    }
  
    static fromJson(json) {
      return new ListResponse({
        success: json.success,
        data: json.data ? json.data.map(user => CourseData.fromJson(user)) : null,
        message: json.message,
      });
    }
  
    toJson() {
      return {
        success: this.success,
        data: this.data ? this.data.map(user => user.toJson()) : null,
        message: this.message,
      };
    }
  }
  