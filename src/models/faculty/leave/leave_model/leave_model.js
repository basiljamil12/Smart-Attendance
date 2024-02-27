class Student {
  constructor({ _id, name, email, contactno }) {
    this._id = _id;
    this.name = name;
    this.email = email;
    this.contactno = contactno;
  }
}

class LeaveData {
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
    this.fromDate = new Date(fromDate);
    this.toDate = new Date(toDate);
    this.attachment = attachment;
    this.reason = reason;
    this.status = status;
  }

  static fromJson(json) {
    return new LeaveData(json);
  }

  toJson() {
    return {
      _id: this._id,
      studentId: this.studentId,
      subject: this.subject,
      fromDate: this.fromDate.toISOString(),
      toDate: this.toDate.toISOString(),
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
    this.data = data ? data.map((item) => new LeaveData(item)) : null;
    this.message = message;
  }

  static fromJson(json) {
    return new ListResponse(json);
  }

  toJson() {
    return {
      success: this.success,
      data: this.data ? this.data.map((item) => item.toJson()) : null,
      message: this.message,
    };
  }
}
