interface RatingData {
  [key: string]: number;
}

export default class MovieRatingStorage {
  private ratings: RatingData;

  constructor() {
    this.ratings = this.getRatings();
  }

  private getRatings(): RatingData {
    const storedRatings = localStorage.getItem('movie_ratings');
    return storedRatings ? JSON.parse(storedRatings) : {};
  }

  saveRating(movieId: string, rating: number): void {
    console.log(movieId, rating);
    this.ratings[movieId] = rating;
    localStorage.setItem('movie_ratings', JSON.stringify(this.ratings));
  }

  getRating(movieId: string): number | null {
    console.log(this.ratings);
    return this.ratings[movieId] || null;
  }

  getAllRatings(): RatingData {
    return this.ratings;
  }
}
