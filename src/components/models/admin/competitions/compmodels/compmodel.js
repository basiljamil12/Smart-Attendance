import { format } from "date-fns";

export class CompetitionData {
  constructor({
    id,
    file,
    title,
    description,
    start_date,
    end_date,
    prize_amount,
    prize_amount2,
    prize_amount3,
    culprit,
    is_visible_on_product_page,
    under_18_appropriate,
    suspects,
    cover,
    author,
    amount,
    link_to_author,
    is_one_winner,
    comp_id,
    status,
  }) {
    this.id = id;
    this.file = file;
    this.title = title;
    this.description = description;
    this.start_date = start_date;
    this.end_date = end_date;
    this.prize_amount = prize_amount;
    this.prize_amount2 = prize_amount2;
    this.prize_amount3 = prize_amount3;
    this.culprit = culprit;
    this.is_visible_on_product_page = is_visible_on_product_page;
    this.under_18_appropriate = under_18_appropriate;
    this.suspects = suspects;
    this.cover = cover;
    this.author = author;
    this.amount = amount;
    this.link_to_author = link_to_author;
    this.is_one_winner = is_one_winner;
    this.comp_id = comp_id;
    this.status = status;
  }

  static fromJson(json) {
    return new CompetitionData({
      id: json.id,
      file: json.file,
      title: json.title,
      description: json.description,
      start_date: format(new Date(json.start_date), "MMM dd, yyyy"),
      end_date: format(new Date(json.end_date), "MMM dd, yyyy"),
      prize_amount: json.prize_amount,
      prize_amount2: json.prize_amount2,
      prize_amount3: json.prize_amount3,
      culprit: json.culprit,
      is_visible_on_product_page: json.is_visible_on_product_page,
      under_18_appropriate: json.under_18_appropriate,
      suspects: json.suspects,
      cover: json.cover,
      author: json.author,
      amount: json.amount,
      link_to_author: json.link_to_author,
      is_one_winner: json.is_one_winner,
      comp_id: json.comp_id,
      status: json.status,
    });
  }

  toJson() {
    return {
      file: this.file,
      title: this.title,
      description: this.description,
      start_date: format(new Date(this.start_date), "MMM dd, yyyy"),
      end_date: format(new Date(this.end_date), "MMM dd, yyyy"),
      prize_amount: this.prize_amount,
      prize_amount2: this.prize_amount2,
      prize_amount3: this.prize_amount3,
      culprit: this.culprit,
      is_visible_on_product_page: this.is_visible_on_product_page,
      under_18_appropriate: this.under_18_appropriate,
      suspects: this.suspects,
      cover: this.cover,
      author: this.author,
      amount: this.amount,
      link_to_author: this.link_to_author,
      is_one_winner: this.is_one_winner,
      comp_id: this.comp_id,
      status: this.status,
    };
  }
}

export class SpecCollectionData {
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
    prize_amount2,
    prize_amount3,
    is_visible_on_product_page,
    under_18_appropriate,
    suspects,
    amount,
    link_to_author,
    is_one_winner,
    comp_id,
    culprit,
    total_earnings,
    contributors,
    promo_codes,
  }) {
    this.id = id;
    this.book = book;
    this.cover = cover;
    this.title = title;
    this.author = author;
    this.description = description;
    this.start_date = format(new Date(start_date), "MMM dd, yyyy");
    this.end_date = format(new Date(end_date), "MMM dd, yyyy");
    this.prize_amount = prize_amount;
    this.prize_amount2 = prize_amount2;
    this.prize_amount3 = prize_amount3;
    this.is_visible_on_product_page = is_visible_on_product_page;
    this.under_18_appropriate = under_18_appropriate;
    this.suspects = suspects;
    this.amount = amount;
    this.link_to_author = link_to_author;
    this.is_one_winner = is_one_winner;
    this.comp_id = comp_id;
    this.culprit = culprit;
    this.total_earnings = total_earnings;
    this.contributors = contributors
      ? contributors
          .filter((contributor) => contributor !== null)
          .map((contributor) => new Contributor(contributor))
      : [];
    this.promo_codes = promo_codes
      ? promo_codes
          .filter((promoCode) => promoCode !== null)
          .map((promoCode) => new PromoCodeData(promoCode))
      : [];
  }

  static fromJson(json) {
    const competitionData = json.competition || {};

    return new SpecCollectionData({
      id: competitionData.id,
      book: competitionData.book,
      cover: competitionData.cover,
      title: competitionData.title,
      author: competitionData.author,
      description: competitionData.description,
      start_date: format(new Date(competitionData.start_date), "MMM dd, yyyy"),
      end_date: format(new Date(competitionData.end_date), "MMM dd, yyyy"),
      prize_amount: competitionData.prize_amount,
      prize_amount2: competitionData.prize_amount2,
      prize_amount3: competitionData.prize_amount3,
      is_visible_on_product_page: competitionData.is_visible_on_product_page,
      under_18_appropriate: competitionData.under_18_appropriate,
      suspects: competitionData.suspects,
      amount: competitionData.amount,
      link_to_author: competitionData.link_to_author,
      is_one_winner: competitionData.is_one_winner,
      comp_id: competitionData.comp_id,
      culprit: competitionData.culprit,
      total_earnings: competitionData.total_earnings,
      contributors: competitionData.contributors
        ? competitionData.contributors
            .filter((contributor) => contributor !== null)
            .map((contributor) => new Contributor(contributor))
        : [],
        promo_codes: competitionData.promo_codes
        ? competitionData.promo_codes
            .filter((promoCode) => promoCode !== null)
            .map((promoCode) => new PromoCodeData(promoCode))
        : [],
    });
  }
}

export class Contributor {
  constructor({ username, email, percentage, contributor_earnings, is_owner }) {
    this.username = username;
    this.percentage = percentage;
    this.email = email;
    this.contributor_earnings = contributor_earnings;
    this.is_owner = is_owner;
  }

  static fromJson(json) {
    return new Contributor({
      username: json.username,
      percentage: json.percentage,
      email: json.email,
      contributor_earnings: json.contributor_earnings,
      is_owner: json.is_owner,
    });
  }
}

export class PromoCodeData {
  constructor({ _id, text, discount, competition_id, token }) {
    this._id = _id;
    this.text = text;
    this.discount = discount;
    this.competition_id = competition_id;
    this.token = token;
  }

  static fromJson(json) {
    return new PromoCodeData({
      _id: json._id,
      text: json.text,
      discount: json.discount,
      competition_id: json.competition_id,
      token: json.token,
    });
  }

  toJson() {
    return {
      _id: this._id,
      text: this.text,
      discount: this.discount,
      competition_id: this.competition_id,
      token: this.token,
    };
  }
}

export class BaseResponse {
  constructor({ success, data, message }) {
    this.success = success;
    this.data = data ? new CompetitionData(data) : null;
    this.message = message;
  }

  static fromJson(json) {
    return new BaseResponse({
      success: json.success,
      data: json.data ? CompetitionData.fromJson(json.data) : null,
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

export class CollectionBaseResponse {
  constructor({ success, data }) {
    const competitionData = data ? data.competition || {} : {};

    this.success = success;
    this.data = data ? new SpecCollectionData(competitionData) : null;
  }

  static fromJson(json) {
    const competitionData = json.data ? json.data.competition || {} : {};

    return new CollectionBaseResponse({
      success: json.success,
      data: new SpecCollectionData(competitionData),
    });
  }
}

export class ListResponse {
  constructor({ success, data }) {
    this.success = success;
    this.data = data ? data.map((user) => new CompetitionData(user)) : null;
  }

  static fromJson(json) {
    return new ListResponse({
      success: json.success,
      data: json.data
        ? json.data.map((user) => CompetitionData.fromJson(user))
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
