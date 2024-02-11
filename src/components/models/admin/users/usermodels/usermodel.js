export class UserList {
    constructor({ user_id, username, active_competitions,is_contributor,email, total_competitions, total_spent, total_winnings,is_deleted }) {
      this.user_id = user_id;
      this.username = username;
      this.email = email;
      this.is_contributor = is_contributor;
      this.active_competitions = active_competitions;
      this.total_competitions = total_competitions;
      this.total_spent = total_spent;
      this.total_winnings = total_winnings
      this.is_deleted = is_deleted
      
    }
  
    static fromJson(json) {
      return new UserList({
        user_id: json.user_id,
        username: json.username,
        email: json.email,
        is_contributor: json.is_contributor,
        active_competitions: json.active_competitions,
        total_competitions: json.total_competitions,
        total_spent: json.total_spent,
        total_winnings: json.total_winnings,
        is_deleted: json.is_deleted,
      });
    }
  
    toJson() {
      return {
        user_id: this.user_id,
        username: this.username,
        email: this.email,
        is_contributor: this.is_contributor,
        active_competitions: this.active_competitions,
        total_competitions: this.total_competitions,
        total_spent: this.total_spent,
        total_winnings: this.total_winnings,
        is_deleted: this.is_deleted,
      };
    }
  }

  export class AllUsers {
    constructor({ user_id, email, username }) {
      this.user_id = user_id;
      this.email = email;
      this.username = username;
    }
  
    static fromJson(json) {
      return new AllUsers({
        user_id: json.user_id,
        email: json.email,
        username: json.username,
      });
    }
  
    toJson() {
      return {
        user_id: this.user_id,
        email: this.email,
        username: this.username,
      };
    }
  }

  export class DelUser {
    constructor({  email }) {
   
      this.email = email;
    }
  
    static fromJson(json) {
      return new DelUser({
        email: json.email,
      });
    }
  
    toJson() {
      return {
        email: this.email,
      };
    }
  }

  export class Sale {
    constructor({ book_name, total_amount, bought_on, payment_type }) {
      this.book_name = book_name;
      this.total_amount = total_amount;
      this.bought_on = bought_on;
      this.payment_type = payment_type;
    }
  
    static fromJson(json) {
      return new Sale({
        book_name: json.book_name,
        total_amount: json.total_amount,
        bought_on: json.bought_on,
        payment_type: json.payment_type,
      });
    }
  
    toJson() {
      return {
        book_name: this.book_name,
        total_amount: this.total_amount,
        bought_on: this.bought_on,
        payment_type: this.payment_type,
      };
    }
  }
  
  export class UserActivity {
    constructor({ username,email,joined_on, total_amount_spent, total_winnings, sales,is_deleted,is_email_subscribed }) {
      this.username = username;
      this.email = email;
      this.joined_on = joined_on;
      this.total_amount_spent = total_amount_spent;
      this.total_winnings = total_winnings;
      this.is_deleted = is_deleted;
      this.is_email_subscribed = is_email_subscribed;
      this.sales = sales ? sales.map(sale => new Sale(sale)) : [];
    }
  
    static fromJson(json) {
      return new UserActivity({
        username: json.username,
        email: json.email,
        joined_on: json.joined_on,
        total_amount_spent: json.total_amount_spent,
        total_winnings: json.total_winnings,
        is_deleted: json.is_deleted,
        is_email_subscribed: json.is_email_subscribed,
        sales: json.sales ? json.sales.map(sale => Sale.fromJson(sale)) : [],
      });
    }
  
    toJson() {
      return {
        username: this.username,
        email: this.email,
        joined_on: this.joined_on,
        total_amount_spent: this.total_amount_spent,
        total_winnings: this.total_winnings,
        is_deleted: this.is_deleted,
        is_email_subscribed: this.is_email_subscribed,
        sales: this.sales ? this.sales.map(sale => sale.toJson()) : [],
      };
    }
  }
    
  export class ListResponse {
    constructor({ success, data, message }) {
      this.success = success;
      this.data = data ? data.users.map(user => new UserList(user)) : null;
      this.message = message;
    }
  
    static fromJson(json) {
      return new ListResponse({
        success: json.success,
        data: json.data ? { users: json.data.map(user => UserList.fromJson(user)) } : null,
        message: json.message,
      });
    }
  
    toJson() {
      return {
        success: this.success,
        data: this.data ? { users: this.data.map(user => user.toJson()) } : null,
        message: this.message,
      };
    }
  }

  export class AllResponse {
    constructor({ success, data, message }) {
      this.success = success;
      this.data = data ? data.map(user => new AllUsers(user)) : null;
      this.message = message;
    }
  
    static fromJson(json) {
      return new AllResponse({
        success: json.success,
        data: json.data ? json.data.map(user => AllUsers.fromJson(user)) : null,
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


  export class ActivityResponse {
    constructor({ success, data, message }) {
      this.success = success;
      this.data = data ? new UserActivity(data.user_activity) : null;
      this.message = message;
    }
  
    static fromJson(json) {
      return new ActivityResponse({
        success: json.success,
        data: json.data ? { user_activity: UserActivity.fromJson(json.data.user_activity) } : null,
        message: json.message,
      });
    }
  
    toJson() {
      return {
        success: this.success,
        data: this.data ? { user_activity: this.data.toJson() } : null,
        message: this.message,
      };
    }
  }

  export class ActivityResponse2 {
    constructor({ success, data, message }) {
      this.success = success;
      this.data = data ? new DelUser(data) : null; // Fix here
      this.message = message;
    }
  
    static fromJson(json) {
      return new ActivityResponse2({
        success: json.success,
        data: json.data ? json.data : null, // Fix here
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