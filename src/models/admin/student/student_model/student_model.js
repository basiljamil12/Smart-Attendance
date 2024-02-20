  export class StudentData {
    constructor({ _id, name, email, contactno }) {
      this._id = _id;
      this.name = name;
      this.email = email;
      this.contactno = contactno;
    }
  
    static fromJson(json) {
      return new StudentData({
        _id: json._id,
        name: json.name,
        email: json.email,
        contactno: json.contactno,
        studentID: json.studentID,
      });
    }
  
    toJson() {
      return {
        _id: this._id,
        name: this.name,
        email: this.email,
        contactno: this.contactno,
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
  