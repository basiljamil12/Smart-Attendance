
export class MiscData {
    constructor({
      email,
      type,
      text,
      subject,
      body,
      username,
    }) {
      this.type = type;
      this.text = text;
      this.email = email;
      this.subject = subject;
      this.body = body;
      this.username = username;
    }
  
    static fromJson(json) {
      return new MiscData({       
        type: json.type,
        text: json.text,
        email: json.email,
        subject: json.subject,
        body: json.body,
        username: json.username,

      });
    }
}

export class BaseResponse {
  constructor({ success, data, message }) {
    this.success = success;
    this.data = data ? new MiscData(data) : null;
    this.message = message;
  }

  static fromJson(json) {
    return new BaseResponse({
      success: json.success,
      data: json.data ? MiscData.fromJson(json.data) : null,
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
        this.data = data ? data.map(user => new MiscData(user)) : null;
        this.message = message;
    }

    static fromJson(json) {
        return new ListResponse({
            success: json.success,
            data: json.data ? json.data.map(user => MiscData.fromJson(user)) : null,
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
