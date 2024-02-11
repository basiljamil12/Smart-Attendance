import { format } from 'date-fns';

class UserData {
  constructor({ username, email, token, is_contributor, competitions, is_email_verified,is_email_subscribed, total_spent, joined_on, passwordResetOTP,is_from_signup }) {
    this.username = username;
    this.email = email;
    this.token = token;
    this.is_contributor = is_contributor;
    this.competitions = competitions ? competitions.filter(competition => competition !== null).map(competition => new Competition(competition)) : [];
    this.is_email_verified = is_email_verified;
    this.is_email_subscribed = is_email_subscribed;
    this.total_spent = total_spent;
    this.joined_on = joined_on;
    this.passwordResetOTP = passwordResetOTP;
    this.is_email_subscribed = is_email_subscribed;
    this.is_from_signup=is_from_signup;
  }

  static fromJson(json) {
    return new UserData({
      username: json.username,
      email: json.email,
      token: json.token,
      is_contributor: json.is_contributor,
      competitions: json.competitions ? json.competitions.filter(competition => competition !== null).map(competition => Competition.fromJson(competition)) : [],
      is_email_verified: json.is_email_verified,
      is_email_subscribed: json.is_email_subscribed,
      total_spent: json.total_spent,
      joined_on: format(new Date(json.joined_on), 'MMM dd, yyyy'),
      passwordResetOTP: json.passwordResetOTP,
      is_email_subscribed: json.is_email_subscribed,
      is_from_signup: json.is_from_signup,
    });
  }

  toJson() {
    return {
      username: this.username,
      email: this.email,
      token: this.token,
      is_contributor: this.is_contributor,
      competitions: this.competitions.map(competition => competition.toJson()),
      is_email_verified: this.is_email_verified,
      is_email_subscribed: this.is_email_subscribed,
      total_spent: this.total_spent,
      joined_on: this.format(new Date(this.joined_on), 'MMM dd, yyyy'),
      passwordResetOTP: this.passwordResetOTP,
      is_email_subscribed: this.is_email_subscribed,
      is_from_signup: this.is_from_signup,
    };
  }
}

class Competition {
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
    is_one_winner,
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
    this.is_one_winner = is_one_winner;
    this.cover = cover;
  }

  static fromJson(json) {
    return new Competition({
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
      is_one_winner: json.is_one_winner,
      cover: json.cover,
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
      is_one_winner: this.is_one_winner,
      cover: this.cover,
    };
  }
}

  
  // export class AddAdmin {
  //   constructor({email, password, username,is_email_subscribed}){
  //     this.email = email;
  //     this.password = password;
  //     this.username = username;
  //     this.is_email_subscribed = is_email_subscribed;
  //   }
  //   static fromJson(json) {
  //     return new AddAdmin({
  //       email: json.email,
  //       password: json.password,
  //       username: json.username,
  //       is_email_subscribed: json.is_email_subscribed,
        
  //     });
  //   }
  
  //   toJson() {
  //     return {
  //       email: this.email,
  //       password: this.password,
  //       username: this.username,
  //       is_email_subscribed: this.is_email_subscribed,
  //     };
  //   }
  // }
  
  // export class ChangeUsernameData {
  //   constructor({username}) {
  //     this.username = username;
  //   }
  
  //   static fromJson(json) {
  //     return new ChangeUsernameData({
  //       username: json.username,
  //     });
  //   }
  
  //   toJson() {
  //     return {
  //       username: this.username,
  //     };
  //   }
  // }
  
  export class BaseResponse {
    constructor({ success, data, message }) {
      this.success = success;
      this.data = data ? new UserData(data) : null;
      if (this.data) {
        this.data.competitions = this.data.competitions ? this.data.competitions.filter(competition => competition !== null).map(competition => new Competition(competition)) : [];
      }
      this.message = message;
    }
  
    static fromJson(json) {
      return new BaseResponse({
        success: json.success,
        data: json.data ? UserData.fromJson(json.data) : null,
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
      this.data = data ? data.map(user => new UserData(user)) : null;
      this.message = message;
    }
  
    static fromJson(json) {
      return new ListResponse({
        success: json.success,
        data: json.data ? json.data.map(user => UserData.fromJson(user)) : null,
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
  