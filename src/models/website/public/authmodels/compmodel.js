import { format } from 'date-fns';
export class WebCompData {
    constructor({
        id,
        cover,
      title,
      author,
      description,
      end_date,
      prize_amount,
      amount,
      start_date,
      under_18_appropriate,
      link_to_author,
      type,
      text,
      email,
      status,
      winners,
      is_purchased,
    }) {
        this.id = id;
        this.cover = cover;
      this.title = title;
      this.author = author;
      this.description = description;
      this.end_date = end_date;
      //this.prize_amount = prize_amount;
      this.prize_amount = prize_amount ? prize_amount.map(prize_amount => prize_amount) : [];
      this.amount = amount;
      this.start_date = start_date;
      this.under_18_appropriate = under_18_appropriate;
      this.link_to_author = link_to_author;
      this.type = type;
      this.text = text;
      this.email = email;
      this.status = status;
      this.winners = winners ? winners.map(winner => winner.trim()) : [];
      this.is_purchased = is_purchased;
   }
  
    static fromJson(json) {
      return new WebCompData({
        
        id: json.id,
        cover: json.cover,
        title: json.title,
        author: json.author,
        description: json.description,
        end_date: format(new Date(json.end_date), 'MMM dd, yyyy'),
        //prize_amount: json.prize_amount,
        prize_amount: json.prize_amount ? json.prize_amount.map(prize_amount => prize_amount) : [],
        amount: json.amount,
        start_date: format(new Date(json.start_date), 'MMM dd, yyyy'),
        under_18_appropriate: json.under_18_appropriate,
        link_to_author: json.link_to_author,
        type: json.type,
        text: json.text,
        email: json.email,
        status: json.status,
        winners: json.winners ? json.winners.map(winner => winner.trim()) : [],
        is_purchased: json.is_purchased,
   
      });
    }
}

export class BaseResponse {
  constructor({ success, data, message }) {
    this.success = success;
    this.data = data ? new WebCompData(data) : null;
    this.message = message;
  }

  static fromJson(json) {
    return new BaseResponse({
      success: json.success,
      data: json.data ? WebCompData.fromJson(json.data) : null,
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

export class AllCompBook {
    constructor({ success, data, message }) {
        this.success = success;
        this.data = data ? data.map(user => new WebCompData(user)) : null;
        this.message = message;
    }

    static fromJson(json) {
        return new AllCompBook({
            success: json.success,
            data: json.data ? json.data.map(user => WebCompData.fromJson(user)) : null,
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
