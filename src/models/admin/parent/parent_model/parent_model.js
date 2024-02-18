export class ParentData {
    constructor({ name, email, contactno, studentID }) {
      this.name = name;
      this.email = email;
      this.contactno = contactno;
      this.studentID = studentID;
    }
  
    static fromJson(json) {
      return new ParentData({
        name: json.name,
        email: json.email,
        contactno: json.contactno,
        studentID: json.studentID,
      });
    }
  
    toJson() {
      return {
        name: this.name,
        email: this.email,
        contactno: this.contactno,
        studentID: this.studentID,
      };
    }
  }

  export class StudentData {
    constructor({ name, email, contactno }) {
      this.name = name;
      this.email = email;
      this.contactno = contactno;
    }
  
    static fromJson(json) {
      return new StudentData({
        name: json.name,
        email: json.email,
        contactno: json.contactno,
        studentID: json.studentID,
      });
    }
  
    toJson() {
      return {
        name: this.name,
        email: this.email,
        contactno: this.contactno,
      };
    }
  }


  
  export class BaseResponse {
    constructor({ success, data, message }) {
      this.success = success;
      this.data = data ? new ParentData(data) : null;
      this.message = message;
    }
  
    static fromJson(json) {
      return new BaseResponse({
        success: json.success,
        data: json.data ? ParentData.fromJson(json.data) : null,
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
      this.data = data ? data.map(user => new ParentData(user)) : null;
      this.message = message;
    }
  
    static fromJson(json) {
      return new ListResponse({
        success: json.success,
        data: json.data ? json.data.map(user => ParentData.fromJson(user)) : null,
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
  