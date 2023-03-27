interface Rating {
  [id: string]: string;
}

class RatingService {
  #rating;

  constructor(rating: Rating) {
    this.#rating = rating;
  }

  getRating() {
    return this.#rating;
  }

  findRatingById(id: keyof Rating) {
    return this.#rating[id];
  }

  update(id: keyof Rating, rating: Rating[keyof Rating]) {
    this.#rating[id] = rating;
  }

  clear() {
    this.#rating = {};
  }
}

export default RatingService;
