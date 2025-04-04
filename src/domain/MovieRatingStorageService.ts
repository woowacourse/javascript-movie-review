import MovieRating from './MovieRating';

export default class MovieRatingStorageService {
  private static readonly STORAGE_KEY = 'movieRatings';

  static saveRating(movieRating: MovieRating): void {
    const ratings = this.getAllRatings();
    ratings[movieRating.getMovieId()] = movieRating.getRating();
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(ratings));
  }

  static getRating(movieId: number): number {
    const ratings = this.getAllRatings();
    return ratings[movieId] || 0;
  }

  static getAllRatings(): Record<number, number> {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  }

  static removeRating(movieId: number): void {
    const ratings = this.getAllRatings();
    delete ratings[movieId];
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(ratings));
  }
}
