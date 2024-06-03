  export class StudentData {
    constructor({ _id, name, email, contactno,registered_face }) {
      this._id = _id;
      this.name = name;
      this.email = email;
      this.contactno = contactno;
      this.registered_face = registered_face;
    }
  
    static fromJson(json) {
      return new StudentData({
        _id: json._id,
        name: json.name,
        email: json.email,
        contactno: json.contactno,
        registered_face: json.registered_face,
      });
    }
  
    toJson() {
      return {
        _id: this._id,
        name: this.name,
        email: this.email,
        contactno: this.contactno,
        registered_face: this.registered_face,
      };
    }
  }
  class Data {
    constructor({ attendance_records,detected_image,detected_students_in_image,no_of_niqaabi_students_in_image,recognized_students_in_image,unrecognized_students_in_image }) {
      this.attendance_records = attendance_records.map(record => new AttendanceRecord(record));
      this.detected_image = detected_image;
      this.detected_students_in_image = detected_students_in_image;
      this.recognized_students_in_image = recognized_students_in_image;
      this.unrecognized_students_in_image = unrecognized_students_in_image;
    }
  
    static fromJson(json) {
      return new Data({
        attendance_records: json.attendance_records,
        detected_image: json.detected_image,
        detected_students_in_image: json.detected_students_in_image,
        recognized_students_in_image: json.recognized_students_in_image,
        unrecognized_students_in_image: json.unrecognized_students_in_image,
      });
    }
  
    toJson() {
      return {
        attendance_records: this.attendance_records.map(record => record.toJson()),
        detected_image: this.detected_image,
        detected_students_in_image: this.detected_students_in_image,
        recognized_students_in_image: this.recognized_students_in_image,
        unrecognized_students_in_image: this.unrecognized_students_in_image,
      };
    }
  }
  class AttendanceRecord {
    constructor({ status, studentId }) {
      this.status = status;
      this.studentId = studentId;
    }
  
    static fromJson(json) {
      return new AttendanceRecord({
        status: json.status,
        studentId: json.studentId,
      });
    }
  
    toJson() {
      return {
        status: this.status,
        studentId: this.studentId,
      };
    }
  }
  export class FaceBaseResponse {
    constructor({ success, data, message }) {
      this.success = success;
      this.data = data ? new Data(data) : null;
      this.message = message;
    }
  
    static fromJson(json) {
      return new FaceBaseResponse({
        success: json.success,
        data: json.data ? Data.fromJson(json.data) : null,
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
  export class BaseResponse {
    constructor({ success, data, message }) {
      this.success = success;
      this.data = data ? new StudentData(data) : null;
      this.message = message;
    }
  
    static fromJson(json) {
      return new BaseResponse({
        success: json.success,
        data: json.data ? StudentData.fromJson(json.data) : null,
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
      this.data = data ? data.map(user => new StudentData(user)) : null;
      this.message = message;
    }
  
    static fromJson(json) {
      return new ListResponse({
        success: json.success,
        data: json.data ? json.data.map(user => StudentData.fromJson(user)) : null,
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
  