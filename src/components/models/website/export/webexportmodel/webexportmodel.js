export class UserData {
    constructor({}) {}
  
    static fromJson(json) {
      return new UserData({});
    }
  
    toJson() {
      return {};
    }
  }
  
  export class BaseResponse {
    constructor({ success, data, message }) {
      this.success = success;
      this.data = data ? data : null; // Store the base64-encoded data directly
      this.message = message;
    }
  
    static fromJson(json) {
      return new BaseResponse({
        success: json.success,
        data: json.data ? json.data : null, // Assume data is already a base64-encoded string
        message: json.message,
      });
    }
  
    toJson() {
      return {
        success: this.success,
        data: this.data ? this.data : null, // Return the base64-encoded data directly
        message: this.message,
      };
    }
  }
  