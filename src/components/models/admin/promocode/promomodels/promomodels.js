export class PromoCodeData {
    constructor({ _id,text, discount,competition_id, token, }) {
      this._id = _id;
      this.text = text;
      this.discount = discount;
      this.competition_id = competition_id;
      this.token = token;
    }
  
    static fromJson(json) {
      return new PromoCodeData({
        _id: json._id,
        text: json.text,
        discount: json.discount,
        competition_id: json.competition_id,
        token: json.token,
      });
    }
  
    toJson() {
      return {
        _id: this._id,
        text: this.text,
        discount: this.discount,
        competition_id: this.competition_id,
        token: this.token,
      };
    }
  }
  
  
  export class BaseResponse {
    constructor({ success, data, message }) {
      this.success = success;
      this.data = data ? new PromoCodeData(data) : null;
      this.message = message;
    }
  
    static fromJson(json) {
      return new BaseResponse({
        success: json.success,
        data: json.data ? PromoCodeData.fromJson(json.data) : null,
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
      this.data = data ? data.map(item => new PromoCodeData(item)) : null;
      this.message = message;
    }
  
    static fromJson(json) {
      return new ListResponse({
        success: json.success,
        data: json.data ? json.data.map(item => PromoCodeData.fromJson(item)) : null,
        message: json.message,
      });
    }
  
    toJson() {
      return {
        success: this.success,
        data: this.data ? this.data.map(item => item.toJson()) : null,
        message: this.message,
      };
    }
  }