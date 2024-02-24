export class FacultyData {
    constructor({ _id, name, email, contactno, password, isStudentAdvisor }) {
      this._id = _id;
      this.name = name;
      this.email = email;
      this.password = password;
      this.contactno = contactno;
      this.isStudentAdvisor = isStudentAdvisor;
    }
  
    static fromJson(json) {
      return new FacultyData({
        id: json._id,
        name: json.name,
        email: json.email,
        password: json.password,
        contactno: json.contactno,
        isStudentAdvisor: json.isStudentAdvisor,
      });
    }
  
    toJson() {
      return {
        id: this._id,
        name: this.name,
        email: this.email,
        password: this.password,
        contactno: this.contactno,
        isStudentAdvisor: this.isStudentAdvisor,
      };
    }
  }
  
  export class BaseResponse {
    constructor({ success, data, message }) {
      this.success = success;
      this.data = data ? new FacultyData(data) : null;
      this.message = message;
    }
  
    static fromJson(json) {
      return new BaseResponse({
        success: json.success,
        data: json.data ? FacultyData.fromJson(json.data) : null,
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
      this.data = data ? data.map((user) => new FacultyData(user)) : null;
      this.message = message;
    }
  
    static fromJson(json) {
      return new ListResponse({
        success: json.success,
        data: json.data
          ? json.data.map((user) => FacultyData.fromJson(user))
          : null,
        message: json.message,
      });
    }
  
    toJson() {
      return {
        success: this.success,
        data: this.data ? this.data.map((user) => user.toJson()) : null,
        message: this.message,
      };
    }
  }
  