import { ratingType } from "../components/layout/Modal";
import { LocalStorage } from "./Storage";

interface MovieRating {
  movieId: number;
  rate: ratingType;
}

export default class UserMovieRatingStorage {
  private static instance: UserMovieRatingStorage;
  private static readonly MOVIE_RATING_KEY = "movieRatingKey";
  private storage: LocalStorage = new LocalStorage();

  static getInstance(): UserMovieRatingStorage {
    if (!UserMovieRatingStorage.instance)
      UserMovieRatingStorage.instance = new UserMovieRatingStorage();
    return UserMovieRatingStorage.instance;
  }

  getRatings(): MovieRating[] {
    return (
      this.storage.get<MovieRating[]>(
        UserMovieRatingStorage.MOVIE_RATING_KEY
      ) ?? []
    );
  }

  setRating(rating: MovieRating) {
    const ratings = this.getRatings();

    const existingIndex = ratings.findIndex(
      (r) => r.movieId === rating.movieId
    );

    if (existingIndex >= 0) ratings[existingIndex] = rating;
    else ratings.push(rating);

    this.storage.set<MovieRating[]>(
      UserMovieRatingStorage.MOVIE_RATING_KEY,
      ratings
    );
  }

  removeRating(movieId: MovieRating["movieId"]) {
    const ratings = this.getRatings();
    const filteredRatings = ratings.filter((r) => r.movieId !== movieId);
    this.storage.set(UserMovieRatingStorage.MOVIE_RATING_KEY, filteredRatings);
  }

  clearAllRatings() {
    this.storage.remove(UserMovieRatingStorage.MOVIE_RATING_KEY);
  }
}
