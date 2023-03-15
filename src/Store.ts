import { fetchPopularMovies, fetchSearchMovies } from './fetch';
import { Movie } from './types';

class Store {
  movieList: Movie[];
  page: number;

  constructor() {
    this.movieList = [];
    this.page = 1;
  }

  async getPopularMovieList() {
    this.movieList = await fetchPopularMovies(this.page);
    this.page++;
  }

  async searchMovie(value: string) {
    this.movieList = await fetchSearchMovies(this.page, value);
    this.page++;
  }

  get movieListValue() {
    return this.movieList;
  }
}

export default Store;
