export class WebAuthDash {
    constructor({
        book_id,
        book_name,
      author,
      contributor_percentage,
      book_amount,
      contributor_earnings,
      entrants
      
    }) {
        this.book_id = book_id;
      this.book_name = book_name;
      this.author = author;
      this.contributor_percentage = contributor_percentage;
      this.book_amount = book_amount;
      this.contributor_earnings = contributor_earnings;
      this.entrants = entrants;
    }
    static fromJson(json) {
      return new WebAuthDash({
        
        book_id: json.book_id,
        book_name: json.book_name,
        author: json.author,
        contributor_percentage: json.contributor_percentage,
        book_amount: json.book_amount,
        contributor_earnings: json.contributor_earnings,
        entrants: json.entrants,

      });
    }
    toJson() {
      return {
        book_id: this.book_id,
        book_name: this.book_name,
          author: this.author,
          contributor_percentage: this.contributor_percentage,
          book_amount: this.book_amount,
          contributor_earnings: this.contributor_earnings,
          entrants: this.entrants,
      };
  }
}
export class Contributions {
  constructor({ success, data, message }) {
      this.success = success;
     // this.data = data ? new WebAuthDash(data) : null;
    this.data = data ? data.map(user => new WebAuthDash(user)) : null;
     
      this.message = message;
  }

  static fromJson(json) {
      return new Contributions({
          success: json.success,
          //data: json.data ? WebAuthDash.fromJson(json.data) : null,
          data: json.data ? json.data.map(user => WebAuthDash.fromJson(user)) : null,

          message: json.message,
      });
  }

  toJson() {
      return {
          success: this.success,
          //data: this.data ? this.data.toJson() : null,
         data: this.data ? this.data.map(user => user.toJson()) : null,

          message: this.message,
      };
  }

  
}
