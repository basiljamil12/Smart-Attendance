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
export class CourseAndAttendanceData {
  constructor({ _id, courseId, studentId, total_hours, present_hours, absent_hours, attendance }) {
    this._id = _id;
    this.courseId = courseId; // Access courseId's _id
    this.studentId = studentId;
    this.total_hours = total_hours;
    this.present_hours = present_hours;
    this.absent_hours = absent_hours;
    this.attendance = attendance.map(({ date, topics,present_hours,absent_hours,hours }) => ({
      date,
      topics: topics ,
      present_hours,
      absent_hours,
      hours
    }));
  }

  static fromJson(json) {
    return new CourseAndAttendanceData({
      _id: json._id,
      courseId: json.courseId,
      studentId: json.studentId,
      total_hours: json.total_hours,
      present_hours: json.present_hours,
      absent_hours: json.absent_hours,
      attendance: json.attendance
    });
  }

  toJson() {
    return {
      _id: this._id,
      courseId: this.courseId,
      studentId: this.studentId,
      total_hours: this.total_hours,
      present_hours: this.present_hours,
      absent_hours: this.absent_hours,
      attendance: this.attendance
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

export class ListResponseByStudent {
  constructor({ success, data, message }) {
    this.success = success;
    this.data = data ? data.map((user) => new CourseAndAttendanceData(user)) : null;
    this.message = message;
  }

  static fromJson(json) {
    return new ListResponse({
      success: json.success,
      data: json.data
        ? json.data.map((user) => CourseAndAttendanceData.fromJson(user))
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

export class BaseResponseByStudent {
  constructor({ success, data, message }) {
    this.success = success;
    this.data = data ? new CourseAndAttendanceData(data) : null;
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

