export class CourseInfo {
    constructor({ courseId,studentId,status }) {
      this.courseId = courseId;
      this.studentId = studentId;
        this.status = status;
    
    }
  
    static fromJson(json) {
      return new CourseInfo({
        courseId: json.courseId,
        studentId: json.studentId,
        status: json.status,
      });
    }
  
    toJson() {
      return {
        courseId: this.courseId,
        studentId: this.studentId,
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
class AllCourseInfo {
  constructor({ _id, courseId, studentId, status, created_on, deleted_on }) {
      this._id = _id;
      this.courseId = courseId ? new Course(courseId) : null;
      this.studentId = studentId ? new Student(studentId) : null;
      this.status = status;
      this.created_on = created_on;
      this.deleted_on = deleted_on;
  }

  static fromJson(json) {
      return new AllCourseInfo({
          _id: json._id,
          courseId: json.courseId,
          studentId: json.studentId,
          status: json.status,
          created_on: json.created_on,
          deleted_on: json.deleted_on
      });
  }

  toJson() {
      return {
          _id: this._id,
          courseId: this.courseId ? this.courseId.toJson() : null,
          studentId: this.studentId ? this.studentId.toJson() : null,
          status: this.status,
          created_on: this.created_on,
          deleted_on: this.deleted_on
      };
  }
}

class Course {
  constructor({ _id, courseCode, courseName, courseCredHrs, studentsEnrolled, courseTeacher, created_on, deleted_on, status }) {
      this._id = _id;
      this.courseCode = courseCode;
      this.courseName = courseName;
      this.courseCredHrs = courseCredHrs;
      this.studentsEnrolled = studentsEnrolled ? studentsEnrolled.map(student => new Student(student)) : null; // This may be null
      this.courseTeacher = courseTeacher ? new Teacher(courseTeacher) : null;
      this.created_on = created_on;
      this.deleted_on = deleted_on;
      this.status = status;
  }

  static fromJson(json) {
    return new Course({
        _id: json._id,
        courseCode: json.courseCode,
        courseName: json.courseName,
        courseCredHrs: json.courseCredHrs,
        studentsEnrolled: json.studentsEnrolled, // Allow null value
        courseTeacher: json.courseTeacher ? new Teacher(json.courseTeacher) : null,
        created_on: json.created_on,
        deleted_on: json.deleted_on,
        status: json.status
    });
  }

  toJson() {
      return {
          _id: this._id,
          courseCode: this.courseCode,
          courseName: this.courseName,
          courseCredHrs: this.courseCredHrs,
          studentsEnrolled: this.studentsEnrolled, // Keep the property as is
          courseTeacher: this.courseTeacher ? this.courseTeacher.toJson() : null,
          created_on: this.created_on,
          deleted_on: this.deleted_on,
          status: this.status
      };
  }
}


class Teacher {
  constructor({ _id, name, email, contactno, isStudentAdvisor, created_on, deleted_on }) {
    this._id = _id;
    this.name = name;
    this.email = email;
    this.contactno = contactno;
    this.isStudentAdvisor = isStudentAdvisor;
    this.created_on = created_on;
    this.deleted_on = deleted_on;
  }

  toJson() {
    return {
      _id: this._id,
      name: this.name,
      email: this.email,
      contactno: this.contactno,
      isStudentAdvisor: this.isStudentAdvisor,
      created_on: this.created_on,
      deleted_on: this.deleted_on
    };
  }
}

class Student {
  constructor({ _id, name, email, contactno, created_on, deleted_on }) {
      this._id = _id;
      this.name = name;
      this.email = email;
      this.contactno = contactno;
      this.created_on = created_on;
      this.deleted_on = deleted_on;
  }

  toJson() {
      return {
          _id: this._id,
          name: this.name,
          email: this.email,
          contactno: this.contactno,
          created_on: this.created_on,
          deleted_on: this.deleted_on
      };
  }
}

export class BaseResponseForAllCourse {
  constructor({ success, data, message }) {
      this.success = success;
      this.data = data ? new AllCourseInfo(data) : null;
      this.message = message;
  }

  static fromJson(json) {
      return new BaseResponseForAllCourse({
          success: json.success,
          data: json.data ? AllCourseInfo.fromJson(json.data) : null,
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

export class ListResponseForAllCourse {
  constructor({ success, data, message }) {
      this.success = success;
      this.data = data ? data.map(entry => new AllCourseInfo(entry)) : null;
      this.message = message;
  }

  static fromJson(json) {
      return new ListResponseForAllCourse({
          success: json.success,
          data: json.data ? json.data.map(entry => AllCourseInfo.fromJson(entry)) : null,
          message: json.message,
      });
  }

  toJson() {
      return {
          success: this.success,
          data: this.data ? this.data.map(entry => entry.toJson()) : null,
          message: this.message,
      };
  }
}

export class ListResponseForFacultyCourse {
  constructor({ success, data, message }) {
      this.success = success;
      this.data = data ? data.map(entry => new Course(entry)) : null;
      this.message = message;
  }

  static fromJson(json) {
      return new ListResponseForFacultyCourse({
          success: json.success,
          data: json.data ? json.data.map(entry => Course.fromJson(entry)) : null,
          message: json.message,
      });
  }

  toJson() {
      return {
          success: this.success,
          data: this.data ? this.data.map(entry => entry.toJson()) : null,
          message: this.message,
      };
  }
}
export class BaseResponseForFacultyCourse {
  constructor({ success, data, message }) {
      this.success = success;
      this.data = data ? new Course(data) : null;
      this.message = message;
  }

  static fromJson(json) {
      return new BaseResponseForFacultyCourse({
          success: json.success,
          data: json.data ? Course.fromJson(json.data) : null,
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

