export class AttendanceData {
  constructor({ _id, courseId, date, attendance }) {
    this._id = _id;
    this.courseId = courseId;
    this.date = date;
    this.attendance = attendance.map(({ studentId, status }) => ({
      studentId,
      status,
    }));
  }

  static fromJson(json) {
    return new AttendanceData({
      id: json._id,
      courseId: json.courseId,
      date: json.date,
      attendance: json.attendance,
    });
  }

  toJson() {
    return {
      id: this._id,
      courseId: this.courseId,
      date: this.date,
      attendance: this.attendance,
    };
  }
}

export class BaseResponse {
  constructor({ success, data, message }) {
    this.success = success;
    this.data = data ? new AttendanceData(data) : null;
    this.message = message;
  }

  static fromJson(json) {
    return new BaseResponse({
      success: json.success,
      data: json.data ? AttendanceData.fromJson(json.data) : null,
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
    this.data = data ? data.map((user) => new AttendanceData(user)) : null;
    this.message = message;
  }

  static fromJson(json) {
    return new ListResponse({
      success: json.success,
      data: json.data
        ? json.data.map((user) => AttendanceData.fromJson(user))
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
