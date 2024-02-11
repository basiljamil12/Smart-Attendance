export class SubsMail {
    constructor({
        email,
    }) {
        this.email = email;
    }
  
    static fromJson(json) {
      return new SubsMail({
        
        email: json.email,

      });
    }
    toJson() {
      return {
        email: this.email,
      };
  }
}
export class BaseResponse {
  constructor({ success, data, message }) {
      this.success = success;
      this.data = data ? new SubsMail(data) : null;
      this.message = message;
  }

  static fromJson(json) {
      return new BaseResponse({
          success: json.success,
          data: json.data ? SubsMail.fromJson(json.data) : null,
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
