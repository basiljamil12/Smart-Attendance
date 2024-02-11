export class EntryByIdData {
  constructor({ is_one_winner, culprit, suspects, winners, entries }) {
    this.is_one_winner = is_one_winner;
    this.culprit = culprit;
    this.suspects = suspects;
    this.winners = winners
      ? winners
          .filter((winner) => winner !== null)
          .map((winner) => new EntryWinnerData(winner))
      : [];
    this.entries = entries
      ? entries
          .filter((entry) => entry !== null)
          .map((entry) => new EntryData(entry))
      : [];
  }

  static fromJson(json) {
    return new EntryByIdData({
      is_one_winner: json.is_one_winner,
      culprit: json.culprit,
      suspects: json.suspects,
      winners: json.winners
        ? json.winners
            .filter((winner) => winner !== null)
            .map((winner) => new EntryWinnerData(winner))
        : [],
      entries: json.entries
        ? json.entries
            .filter((entry) => entry !== null)
            .map((entry) => new EntryData(entry))
        : [],
    });
  }

  toJson() {
    return {
      is_one_winner: this.is_one_winner,
      culprit: this.culprit,
      suspects: this.suspects,
      winners: this.winners.map((winner) => winner.toJson()),
      entries: this.entries.map((entry) => entry.toJson()),
    };
  }
}

export class EntryWinnerData {
  constructor({
    _id,
    entry_id,
    user_id,
    book_id,
    position
  }) {
    this._id = _id;
    this.entry_id = entry_id;
    this.user_id = user_id;
    this.book_id = book_id;
    this.position = position;
  }

  static fromJson(json) {
    return new EntryWinnerData({
      _id: json._id,
      entry_id: json.entry_id,
      user_id: json.user_id,
      book_id: json.book_id,
      position: json.position,
    });
  }

  toJson() {
    return {
      _id: this._id,
      entry_id: this.entry_id,
      book_id: this.book_id,
      user_id: this.user_id,
      position: this.position,
    };
  }
}

export class EntryData {
  constructor({
    _id,
    book_id,
    user_id,
    username,
    email,
    bought_on,
    submitted_on,
    guess,
    winner,
    is_culprit_match,
  }) {
    this._id = _id;
    this.book_id = book_id;
    this.user_id = user_id;
    this.username = username;
    this.email = email;
    this.bought_on = bought_on;
    this.submitted_on = submitted_on;
    this.guess = guess;
    this.winner = winner;
    this.is_culprit_match = is_culprit_match;
  }

  static fromJson(json) {
    return new EntryData({
      _id: json._id,
      book_id: json.book_id,
      user_id: json.user_id,
      username: json.username,
      email: json.email,
      bought_on: json.bought_on,
      submitted_on: json.submitted_on,
      guess: json.guess,
      winner: json.winner,
      is_culprit_match: json.is_culprit_match,
    });
  }

  toJson() {
    return {
      _id: this._id,
      book_id: this.book_id,
      user_id: this.user_id,
      username: this.username,
      email: this.email,
      bought_on: this.bought_on,
      submitted_on: this.submitted_on,
      guess: this.guess,
      winner: this.winner,
      is_culprit_match: this.is_culprit_match,
    };
  }
}

export class BaseResponse {
  constructor({ success, data, message }) {
    this.success = success;
    this.data = data ? new EntryByIdData(data) : null;
    if (this.data) {
      this.data.entries = this.data.entries
        ? this.data.entries
            .filter((entry) => entry !== null)
            .map((entry) => new EntryData(entry))
        : [];
    }
    this.message = message;
  }

  static fromJson(json) {
    return new BaseResponse({
      success: json.success,
      data: json.data ? EntryByIdData.fromJson(json.data) : null,
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
    this.data = data ? data.map((user) => new EntryByIdData(user)) : null;
    this.message = message;
  }

  static fromJson(json) {
    return new ListResponse({
      success: json.success,
      data: json.data
        ? json.data.map((user) => EntryByIdData.fromJson(user))
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
