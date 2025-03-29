export default class MovieRatingStorage {
  constructor() {
    this.ratings = this.getRatings();
  }

  getRatings() {
    const storedRatings = localStorage.getItem('movie_ratings');
    return storedRatings ? JSON.parse(storedRatings) : {};
  }

  saveRating(movieId, rating) {
    console.log(movieId, rating);
    this.ratings[movieId] = rating;
    localStorage.setItem('movie_ratings', JSON.stringify(this.ratings));
  }

  getRating(movieId) {
    console.log(this.ratings);
    return this.ratings[movieId] || null;
  }

  getAllRatings() {
    return this.ratings;
  }
}
