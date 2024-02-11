export class WebCompBook {
    constructor({
        cover,
      title,
      author,
      book,
      suspects,
      note
    }) {
        this.cover = cover;
      this.title = title;
      this.author = author;
      this.book = book;
      this.suspects = suspects;
      this.note = note;
    }
  
    static fromJson(json) {
      return new WebCompBook({
        
        cover: json.cover,
        title: json.title,
        author: json.author,
        book: json.book,
        suspects: json.suspects,
        note: json.note,

      });
    }
    toJson() {
      return {
          cover: this.cover,
          title: this.title,
          author: this.author,
          book: this.book,
          suspects: this.suspects,
          note: this.note,
      };
  }
}
export class BookByID {
  constructor({ success, data, message }) {
      this.success = success;
      this.data = data ? new WebCompBook(data) : null;
      this.message = message;
  }

  static fromJson(json) {
      return new BookByID({
          success: json.success,
          data: json.data ? WebCompBook.fromJson(json.data) : null,
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
