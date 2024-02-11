export class WinnerData {
  constructor({
    _id,
    book_id,
    entry_ids,
    user_id,
    username,
    email,
    bought_on,
    submitted_on,
    guess,
    winner,
    position
  }) {
    this._id = _id;
    this.book_id = book_id;
    this.entry_ids = entry_ids;
    this.user_id = user_id;
    this.username = username;
    this.email = email;
    this.bought_on = bought_on;
    this.submitted_on = submitted_on;
    this.guess = guess;
    this.winner = winner;
    this.position = position;
  }

  static fromJson(json) {
    return new WinnerData({
      _id: json._id,
      book_id: json.book_id,
      entry_ids: json.entry_ids,
      user_id: json.user_id,
      username: json.username,
      email: json.email,
      bought_on: json.bought_on,
      submitted_on: json.submitted_on,
      guess: json.guess,
      winner: json.winner,
      position: json.position,
    });
  }

  toJson() {
    return {
      _id: this._id,
      book_id: this.book_id,
      entry_ids: this.entry_ids,
      user_id: this.user_id,
      username: this.username,
      email: this.email,
      bought_on: this.bought_on,
      submitted_on: this.submitted_on,
      guess: this.guess,
      winner: this.winner,
      position: this.position,
    };
  }
}

export class BaseResponse {
  constructor({ success, data, message }) {
    this.success = success;
    this.data = data ? new WinnerData(data) : null;
    this.message = message;
  }

  static fromJson(json) {
    return new BaseResponse({
      success: json.success,
      data: json.data ? WinnerData.fromJson(json.data) : null,
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
    this.data = data && data.winners ? this.mapWinners(data.winners) : null;
    this.message = message;
  }

  mapWinners(winners) {
    if (Array.isArray(winners)) {
      return winners.map((user) => new WinnerData(user));
    } else if (winners) {
      return [new WinnerData(winners)];
    } else {
      return null;
    }
  }

  static fromJson(json) {
    return new ListResponse({
      success: json.success,
      data: json.data ? json.data.winners : null,
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

export class ListWinnerResponse {
  constructor({ success, data, message }) {
    this.success = success;
    this.data = data ? data.map(user => new WinnerData(user)) : null;
    this.message = message;
  }

  static fromJson(json) {
    return new ListWinnerResponse({
      success: json.success,
      data: json.data ? json.data.map(user => WinnerData.fromJson(user)) : null,
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
