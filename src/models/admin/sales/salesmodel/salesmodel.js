
class Sale {
  constructor({
    userid,
    username,
    user_email,
    bought_on,
    payment_type,
    promocode,
    gross_amount,
    paypal_order_id,
  }) {
    this.userid = userid;
    this.username = username;
    this.user_email = user_email;
    this.bought_on = bought_on;
    this.payment_type = payment_type;
    this.promocode = promocode;
    this.gross_amount = gross_amount;
    this.paypal_order_id = paypal_order_id;
  }

  static fromJson(json) {
    return new Sale(json);
  }

  toJson() {
    return {
      userid: this.userid,
      username: this.username,
      user_email: this.user_email,
      bought_on: this.bought_on,
      payment_type: this.payment_type,
      promocode: this.promocode,
      gross_amount: this.gross_amount,
    };
  }
}
  
  class Contributor {
    constructor({ name, email, percentage, contributor_earnings, is_owner }) {
      this.name = name;
      this.email = email;
      this.percentage = percentage;
      this.contributor_earnings = contributor_earnings;
      this.is_owner = is_owner;
    }
  
    static fromJson(json) {
      return new Contributor(json);
    }
  
    toJson() {
      return {
        name: this.name,
        email: this.email,
        percentage: this.percentage,
        contributor_earnings: this.contributor_earnings,
        is_owner: this.is_owner,
      };
    }
  }
  
  class Details {
    constructor({ total_earnings, prize_amount, contributors }) {
      this.total_earnings = total_earnings;
      this.prize_amount = prize_amount;
      this.contributors = contributors.map((contributor) => new Contributor(contributor));
    }
  
    static fromJson(json) {
      return new Details(json);
    }
  
    toJson() {
      return {
        total_earnings: this.total_earnings,
        prize_amount: this.prize_amount,
        contributors: this.contributors.map((contributor) => contributor.toJson()),
      };
    }
  }
  
  export class SalesAPIResponse {
    constructor({ data }) {
      this.sales = Array.isArray(data.sales) ? data.sales.map((sale) => new Sale(sale)) : [];
      this.details = data.Details ? new Details(data.Details) : null;
    }
  
    static fromJson(json) {
      return new SalesAPIResponse(json);
    }
  
    toJson() {
      return {
        data: {
          sales: this.sales.map((sale) => sale.toJson()),
          Details: this.details ? this.details.toJson() : null,
        },
      };
    }
  }
  