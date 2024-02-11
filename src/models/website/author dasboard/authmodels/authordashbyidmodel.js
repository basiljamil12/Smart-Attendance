import { format } from 'date-fns';

class Contribution {
  constructor({ _id, user_id, percentage, is_owner, book_id }) {
    this._id = _id;
    this.user_id = user_id;
    this.percentage = percentage;
    this.is_owner = is_owner;
    this.book_id = book_id;
  }

  static fromJson(json) {
    return new Contribution(json);
  }

  toJson() {
    return {
      _id: this._id,
      user_id: this.user_id,
      percentage: this.percentage,
      is_owner: this.is_owner,
      book_id: this.book_id,
    };
  }
}

class Book {
  constructor({
    _id,
    title,
    description,
    start_date,
    end_date,
    prize_amount,
    culprit,
    is_visible_on_product_page,
    under_18_appropriate,
    suspects,
    cover,
    author,
    amount,
    link_to_author,
    book,
  }) {
    this._id = _id;
    this.title = title;
    this.description = description;
    this.start_date = start_date;
    this.end_date = end_date;
    this.prize_amount = prize_amount;
    this.culprit = culprit;
    this.is_visible_on_product_page = is_visible_on_product_page;
    this.under_18_appropriate = under_18_appropriate;
    this.suspects = suspects;
    this.author = author;
    this.amount = amount;
    this.link_to_author = link_to_author;
    this.cover = cover;
    this.book = book;
  }

  static fromJson(json) {
    return new Book({
      _id: json._id,
      title: json.title,
      description: json.description,
      start_date: format(new Date(json.start_date), 'MMM dd, yyyy'),
      end_date: format(new Date(json.end_date), 'MMM dd, yyyy'),
      prize_amount: json.prize_amount,
      culprit: json.culprit,
      is_visible_on_product_page: json.is_visible_on_product_page,
      under_18_appropriate: json.under_18_appropriate,
      suspects: json.suspects,
      author: json.author,
      amount: json.amount,
      link_to_author: json.link_to_author,
      cover: json.cover,
      book: json.book,
    });
  }

  toJson() {
    return {
      _id: this._id,
      title: this.title,
      description: this.description,
      start_date: format(new Date(this.start_date), 'MMM dd, yyyy'),
      end_date: format(new Date(this.end_date), 'MMM dd, yyyy'),
      prize_amount: this.prize_amount,
      culprit: this.culprit,
      is_visible_on_product_page: this.is_visible_on_product_page,
      under_18_appropriate: this.under_18_appropriate,
      suspects: this.suspects,
      author: this.author,
      amount: this.amount,
      link_to_author: this.link_to_author,
      cover: this.cover,
      book: this.book,
    };
  }
}

class OtherContributor {
  constructor(username) {
    this.username = username;
  }

  static fromJson(json) {
    return new OtherContributor(json);
  }

  toJson() {
    return this.username;
  }
}
class Winners {
  constructor(username) {
    this.username = username;
  }

  static fromJson(json) {
    return new Winners(json);
  }

  toJson() {
    return this.username;
  }
}

class User {
  constructor({
    contribution,
    book,
    contributor_earnings,
    entrants,
    other_contributors,
    winners,
    total_earnings,
  }) {
    this.contribution = contribution
      ? new Contribution(contribution)
      : null;
    this.book = book ? new Book(book) : null;
    this.contributor_earnings = contributor_earnings;
    this.entrants = entrants;
    this.other_contributors = other_contributors
      ? other_contributors.map((username) => new OtherContributor(username))
      : [];
      this.winners = winners
      ? winners.map((username) => new Winners(username))
      : [];
    this.total_earnings = total_earnings;

  }

  static fromJson(json) {
    return new User(json);
  }

  toJson() {
    return {
      contribution: this.contribution ? this.contribution.toJson() : null,
      book: this.book ? this.book.toJson() : null,
      contributor_earnings: this.contributor_earnings,
      entrants: this.entrants,
      other_contributors: this.other_contributors.map((contributor) =>
        contributor.toJson()
      ),
      winners: this.winners.map((username) =>
      username.toJson()
      ),
      total_earnings: this.total_earnings,

    };
  }
}

export class ListResponse {
    constructor({ success, data, message }) {
      this.success = success;
      this.data = data ? (Array.isArray(data) ? data.map(user => new User(user)) : [new User(data)]) : null;
      this.message = message;
    }
  
    static fromJson(json) {
      return new ListResponse({
        success: json.success,
        data: json.data ? (Array.isArray(json.data) ? json.data.map(user => User.fromJson(user)) : [User.fromJson(json.data)]) : null,
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
  