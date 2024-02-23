export class CourseInfo {
    constructor({ courseId,status }) {
        this.courseId = courseId;
        this.status = status;
    
    }
  
    static fromJson(json) {
      return new CourseInfo({
        courseId: json.courseId,
        status: json.status,
      });
    }
  
    toJson() {
      return {
        courseId: this.courseId,
        status: this.status,
      };
    }
  }

  export class BaseResponse {
    constructor({ success, data, message }) {
      this.success = success;
      this.data = data ? new CourseInfo(data) : null;
      this.message = message;
    }
  
    static fromJson(json) {
      return new BaseResponse({
        success: json.success,
        data: json.data ? CourseInfo.fromJson(json.data) : null,
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
      this.data = data ? data.map(user => new CourseInfo(user)) : null;
      this.message = message;
    }
  
    static fromJson(json) {
      return new ListResponse({
        success: json.success,
        data: json.data ? json.data.map(user => CourseInfo.fromJson(user)) : null,
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
  