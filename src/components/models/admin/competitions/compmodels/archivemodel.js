import format from "date-fns/format";

export class ArchiveData {
  constructor({
    id,
    book,
    cover,
    title,
    author,
    description,
    start_date,
    end_date,
    prize_amount,
    is_visible_on_product_page,
    under_18_appropriate,
    suspects,
    amount,
    archived_on,
    status,
  }) {
    this.id = id;
    this.book = book; // Renamed 'file' to 'book'
    this.cover = cover;
    this.title = title;
    this.author = author;
    this.description = description;
    this.start_date = start_date
    this.end_date = end_date;
    this.prize_amount = prize_amount;
    this.is_visible_on_product_page = is_visible_on_product_page;
    this.under_18_appropriate = under_18_appropriate;
    this.suspects = suspects;
    this.amount = amount;
    this.archived_on = format(new Date(archived_on), "MMM dd, yyyy");
    this.status = status;
  }

  static fromJson(json) {
    return new ArchiveData({
      id: json.id,
      book: json.book, // Renamed 'file' to 'book'
      cover: json.cover,
      title: json.title,
      author: json.author,
      description: json.description,
      start_date: json.start_date,
      end_date: json.end_date,
      prize_amount: json.prize_amount,
      is_visible_on_product_page: json.is_visible_on_product_page,
      under_18_appropriate: json.under_18_appropriate,
      suspects: json.suspects,
      amount: json.amount,
      archived_on: json.archived_on,
      status: json.status,
    });
  }

  toJson() {
    return {
      id: this.id,
      book: this.book,
      cover: this.cover,
      title: this.title,
      author: this.author,
      description: this.description,
      start_date: this.start_date,
      end_date: this.end_date,
      prize_amount: this.prize_amount,
      is_visible_on_product_page: this.is_visible_on_product_page,
      under_18_appropriate: this.under_18_appropriate,
      suspects: this.suspects,
      amount: this.amount,
      archived_on: this.archived_on,
      status: this.status,
    };
  }
}

//   export class ArchiveBaseResponse {
//     constructor({ success, data }) {
//       this.success = success;
//       this.data = data ? new ArchiveData(data) : null;
//     }

//     static fromJson(json) {
//       return new ArchiveBaseResponse({
//         success: json.success,
//         data: json.data ? ArchiveData.fromJson(json.data) : null,
//       });
//     }

//     toJson() {
//       return {
//         success: this.success,
//         data: this.data ? this.data.toJson() : null,
//       };
//     }
//   }

export class ListResponse {
  constructor({ success, data }) {
    this.success = success;
    this.data = data ? data.map((user) => new ArchiveData(user)) : null;
  }

  static fromJson(json) {
    return new ListResponse({
      success: json.success,
      data: json.data
        ? json.data.map((user) => ArchiveData.fromJson(user))
        : null,
    });
  }

  toJson() {
    return {
      success: this.success,
      data: this.data ? this.data.map((user) => user.toJson()) : null,
    };
  }
}
