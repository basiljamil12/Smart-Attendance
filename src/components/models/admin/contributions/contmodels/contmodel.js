export class ContributionData {
    constructor({ _id, contribution_id, user_id, email, username, percentage, is_owner, book_id, book_name }) {
      this._id = _id;
      this.contribution_id= contribution_id;
      this.user_id = user_id;
      this.email = email;
      this.username = username;
      this.percentage = percentage;
      this.is_owner = is_owner;
      this.book_id = book_id;
      this.book_name = book_name;
    }
  
    static fromJson(json) {
      return new ContributionData({
        _id: json._id,
        contribution_id: json.contribution_id,
        user_id: json.user_id,
        email: json.email,
        username: json.username,
        percentage: json.percentage,
        is_owner: json.is_owner,
        book_id: json.book_id,
        book_name: json.book_name,
      });
    }
  
    toJson() {
      return {
        _id: this._id,
        contribution_id: this.contribution_id,
        user_id: this.user_id,
        email: this.email,
        username: this.username,
        percentage: this.percentage,
        is_owner: this.is_owner,
        book_id: this.book_id,
        book_name: this.book_name,
      };
    }
  }
  
  export class BaseResponse {
    constructor({ success, data, message }) {
      this.success = success;
      this.data = data;
      this.message = message;
    }
  
    static fromJson(json) {
      return new BaseResponse({
        success: json.success,
        data: json.data,
        message: json.message,
      });
    }
  
    toJson() {
      return {
        success: this.success,
        data: this.data,
        message: this.message,
      };
    }
  }
  
  export class ListResponse {
    constructor({ success, data, message }) {
      this.success = success;
      this.data = data ? data.filter(user => user !== null).map(user => new ContributionData(user)) : null;
      this.message = message;
    }
  
    static fromJson(json) {
      return new ListResponse({
        success: json.success,
        data: json.data ? json.data.filter(user => user !== null).map(user => ContributionData.fromJson(user)) : null,
        message: json.message,
      });
    }
  
    toJson() {
      return {
        success: this.success,
        data: this.data ? this.data.filter(user => user !== null).map(user => user.toJson()) : null,
        message: this.message,
      };
    }
  }
  
  