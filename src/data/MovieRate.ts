import { updateData } from '../utils/localStorage';

interface RatedMovie {
  id: string;
  rate: number;
}

export class MovieRate {
  #ratedMovies: RatedMovie[] = [];
  clickedMovie: RatedMovie = null;

  constructor(ratedMovies: RatedMovie[]) {
    this.#ratedMovies = ratedMovies;
  }

  setClickedMovie(movieId: string, rate: number) {
    this.clickedMovie = { id: movieId, rate: rate };
  }

  setMovieRate() {
    const resultFound = this.#ratedMovies.find((movie) => movie.id === this.clickedMovie.id);

    if (resultFound) {
      resultFound.rate = this.clickedMovie.rate;
    } else {
      this.#ratedMovies.push(this.clickedMovie);
    }

    updateData('rate', this.#ratedMovies);
    this.clickedMovie = null;
  }

  getMovieRate(movieId: string) {
    const resultFound = this.#ratedMovies.find((movie) => movie.id === movieId);
    if (resultFound) return resultFound.rate;

    return;
  }

  getMovieRates() {
    return this.#ratedMovies;
  }
}
