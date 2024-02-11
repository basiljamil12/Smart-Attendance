export class WebEntry {
    constructor({
        book_id,
      guess,
      next_step,
      entry
    }) {
        this.book_id = book_id;
        this.guess = guess;
        this.next_step = next_step;
        this.entry = entry;
    }
  
    static fromJson(json) {
      return new WebEntry({
        
        book_id: json.book_id,
        guess: json.guess,
        next_step: json.next_step,
        entry: json.entry,

      });
    }
}
export class Entry {
  constructor({ success, data }) {
      this.success = success;
      this.data = data ? new WebEntry(data) : null;

  }

  static fromJson(json) {
      return new Entry({
          success: json.success,
          data: json.data ? WebEntry.fromJson(json.data) : null,
      
      });
  }

  toJson() {
      return {
          success: this.success,
          data: this.data ? this.data.toJson() : null,
      };
  }
}
