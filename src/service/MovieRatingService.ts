import { LocalStorageService } from './LocalStorageService';

export interface MovieRating {
  movieId: number;
  rating: number;
}

export class MovieRatingService {
  private readonly STORAGE_KEY = 'movie_ratings';
  private storageService: LocalStorageService;

  constructor(storageService: LocalStorageService) {
    this.storageService = storageService;
  }

  saveMovieRating(movieId: number, rating: number): void {
    const currentRatings = this.getMovieRatings();
    const existingIndex = currentRatings.findIndex(
      (item) => item.movieId === movieId,
    );

    if (existingIndex >= 0) {
      currentRatings[existingIndex].rating = rating;
    } else {
      currentRatings.push({ movieId, rating });
    }

    this.storageService.setItem(this.STORAGE_KEY, currentRatings);
  }

  getMovieRating(movieId: number): number {
    const currentRatings = this.getMovieRatings();
    const ratingItem = currentRatings.find((item) => item.movieId === movieId);

    return ratingItem ? ratingItem.rating : 0;
  }

  getMovieRatings(): MovieRating[] {
    return this.storageService.getItem<MovieRating[]>(this.STORAGE_KEY, []);
  }
}
