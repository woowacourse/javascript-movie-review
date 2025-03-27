import { SessionStorage } from '../utils/storage';

type MovieRate = {
  movieId: number;
  movieName: string;
  rate: number;
  rateDate: Date;
};

class MovieRating {
  private static readonly STORAGE_KEY = 'movie-ratings';

  hasRating(movieId: number): boolean {
    const storedData = SessionStorage.getItems<MovieRate>(
      MovieRating.STORAGE_KEY,
    );
    return storedData.some((item) => item.movieId === movieId);
  }

  getRating(movieId: number): number | null {
    const storedData = SessionStorage.getItems<MovieRate>(
      MovieRating.STORAGE_KEY,
    );
    const movieIndex = storedData.find((item) => item.movieId === movieId);
    return movieIndex ? movieIndex.rate : null;
  }

  setRating(movieId: number, movieName: string, rate: number): void {
    const storedData = SessionStorage.getItems<MovieRate>(
      MovieRating.STORAGE_KEY,
    );
    const movieIndex = storedData.findIndex((item) => item.movieId === movieId);

    if (movieIndex > -1) {
      storedData[movieIndex].rate = rate;
    }
    if (rate > 0) {
      storedData.push({
        movieId: movieId,
        movieName: movieName,
        rate,
        rateDate: new Date(),
      });
    }

    SessionStorage.saveItems(storedData ?? [], MovieRating.STORAGE_KEY);
  }
}

export const movieRating = new MovieRating();
