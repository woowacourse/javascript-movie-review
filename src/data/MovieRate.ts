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
    console.log(resultFound);
    if (resultFound) {
      resultFound.rate = this.clickedMovie.rate;
    } else {
      this.#ratedMovies.push(this.clickedMovie);
    }

    updateData('rate', this.#ratedMovies);
  }

  getMovieRate(movieId: string) {
    const resultFound = this.#ratedMovies.find((movie) => movie.id === movieId);

    return resultFound;
  }

  getMovieRates() {
    return this.#ratedMovies;
  }
}
