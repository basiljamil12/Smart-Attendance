export class SalesData {
  constructor({ paypal_order_id, paypal_client_id, _id, text, discount, competition_id, next_action,amount_subtracted, promocode_id }) {
    this.paypal_order_id = paypal_order_id;
    this.paypal_client_id = paypal_client_id;
    this._id = _id;
    this.text = text;
    this.discount = discount;
    this.competition_id = competition_id;
    this.next_action = next_action;
    this.amount_subtracted = amount_subtracted;
    this.promocode_id = promocode_id;
  }

  static fromJson(json) {
    return new SalesData({
      paypal_order_id: json.paypal_order_id,
      paypal_client_id: json.paypal_client_id,
      _id: json._id,
      text: json.text,
      discount: json.discount,
      paypal_client_id: json.paypal_client_id,
      next_action: json.next_action,
      amount_subtracted: json.amount_subtracted,
      promocode_id: json.promocode_id,
      
    });
  }

  toJson() {
    return {
      paypal_order_id: this.paypal_order_id,
      paypal_client_id: this.paypal_client_id,
      _id: this._id,
      text: this.text,
      discount: this.discount,
      competition_id: this.competition_id,
      next_action: this.next_action,
      amount_subtracted: this.amount_subtracted,
      promocode_id: this.promocode_id,
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

export class BaseSalesResponse {
  constructor({ success, data, message }) {
    this.success = success;
    this.message = message;
  }

  static fromJson(json) {
    return new BaseSalesResponse({
      success: json.success,
      message: json.message,
    });
  }

  toJson() {
    return {
      success: this.success,
      message: this.message,
    };
  }
}

export class ListResponse {
  constructor({ success, data, message }) {
    this.success = success;
    this.data = data ? data.map((user) => new SalesData(user)) : null;
    this.message = message;
  }

  static fromJson(json) {
    return new ListResponse({
      success: json.success,
      data: json.data
        ? json.data.map((user) => SalesData.fromJson(user))
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
