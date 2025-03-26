import { SessionStorage } from '../utils/storage';

type MovieRate = {
  movieId: number;
  movieName: string;
  rate: number;
  rateDate: Date;
};

const STORAGE_KEY = 'movie-ratings';

export default class MovieRating {
  private movieId: number;
  private movieName: string;

  constructor(movieId: number, movieName: string) {
    this.movieId = movieId;
    this.movieName = movieName;
  }

  getRating(): number | null {
    const storedData = SessionStorage.getItems<MovieRate>(STORAGE_KEY);
    const movieIndex = storedData.find((item) => item.movieId === this.movieId);
    return movieIndex ? movieIndex.rate : null;
  }

  setRating(rate: number): void {
    const storedData = SessionStorage.getItems<MovieRate>(STORAGE_KEY);
    const movieIndex = storedData.findIndex(
      (item) => item.movieId === this.movieId,
    );

    if (movieIndex > -1) {
      storedData[movieIndex].rate = rate;
    }
    if (rate > 0) {
      storedData.push({
        movieId: this.movieId,
        movieName: this.movieName,
        rate,
        rateDate: new Date(),
      });
    }

    this.updateStorage(storedData ?? []);
  }

  private updateStorage(data: MovieRate[]): void {
    SessionStorage.saveItems(data, STORAGE_KEY);
  }
}
