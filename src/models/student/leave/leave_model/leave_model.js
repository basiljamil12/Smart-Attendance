import { format } from 'date-fns';

export class LeaveData {
  constructor({
    _id,
    studentId,
    subject,
    fromDate,
    toDate,
    attachment,
    reason,
    status,
  }) {
    this._id = _id;
    this.studentId = studentId;
    this.subject = subject;
    this.fromDate = fromDate;
    this.toDate = toDate;
    this.attachment = attachment;
    this.reason = reason;
    this.status = status;
  }

  static fromJson(json) {
    return new LeaveData({
      _id: json._id,
      studentId: json.studentId,
      subject: json.subject,
      fromDate: format(new Date(json.fromDate), 'MMM dd, yyyy'),
      toDate: format(new Date(json.toDate), 'MMM dd, yyyy'),
      attachment: json.attachment,
      reason: json.reason,
      status: json.status,
    });
  }

  toJson() {
    return {
      _id: this._id,
      studentId: this.studentId,
      name: this.name,
      subject: this.subject,
      fromDate: this.fromDate,
      toDate: this.toDate,
      attachment: this.attachment,
      reason: this.reason,
      status: this.status,
    };
  }
}

export class BaseResponse {
  constructor({ success, data, message }) {
    this.success = success;
    this.data = data ? new LeaveData(data) : null;
    this.message = message;
  }

  static fromJson(json) {
    return new BaseResponse({
      success: json.success,
      data: json.data ? LeaveData.fromJson(json.data) : null,
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
    this.data = data ? data.map((user) => new LeaveData(user)) : null;
    this.message = message;
  }

  static fromJson(json) {
    return new ListResponse({
      success: json.success,
      data: json.data
        ? json.data.map((user) => LeaveData.fromJson(user))
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
