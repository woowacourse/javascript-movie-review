class RatingManager {
  private ratings: Record<number, number> = {};

  setRating(movieId: number, rating: number) {
    this.ratings[movieId] = rating
  }

  getRating(movieId: number) {
    return this.ratings[movieId] ?? 0;
  }

  toString() {
    return JSON.stringify(this.ratings);
  }
}

export default RatingManager;
