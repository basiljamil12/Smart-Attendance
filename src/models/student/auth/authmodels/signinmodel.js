export class UserData {
  constructor({ name, email, token }) {
    this.name = name;
    this.email = email;
    this.token = token;
  
  }

  static fromJson(json) {
    return new UserData({
      name: json.name,
      email: json.email,
      token: json.token,
    });
  }

  toJson() {
    return {
      name: this.name,
      email: this.email,
      token: this.token,
    };
  }
}

export class AddAdmin {
  constructor({email, password, name}){
    this.email = email;
    this.password = password;
    this.name = name;
  }
  static fromJson(json) {
    return new AddAdmin({
      email: json.email,
      password: json.password,
      name: json.name,
      
    });
  }

  toJson() {
    return {
      email: this.email,
      password: this.password,
      name: this.name,
    };
  }
}

export class ChangeUsernameData {
  constructor({name}) {
    this.name = name;
  }

  static fromJson(json) {
    return new ChangeUsernameData({
      name: json.name,
    });
  }

  toJson() {
    return {
      name: this.name,
    };
  }
}

export class BaseResponse {
  constructor({ success, data, message }) {
    this.success = success;
    this.data = data ? new UserData(data) : null;
    this.message = message;
  }

  static fromJson(json) {
    return new BaseResponse({
      success: json.success,
      data: json.data ? UserData.fromJson(json.data) : null,
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
    this.data = data ? data.map(user => new UserData(user)) : null;
    this.message = message;
  }

  static fromJson(json) {
    return new ListResponse({
      success: json.success,
      data: json.data ? json.data.map(user => UserData.fromJson(user)) : null,
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
