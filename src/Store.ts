import { fetchMovies } from './fetch';
import { Movie } from './types';

class Store {
  movieList: Movie[];
  page: number;
  searchWord: string;

  constructor() {
    this.movieList = [];
    this.page = 0;
    this.searchWord = '';
  }

  async getMovieList(value?: string) {
    this.page++;
    if (value) {
      this.searchWord = value;
      this.movieList = await fetchMovies('/search/movie', this.page, value);
      return;
    }
    this.movieList = await fetchMovies('/movie/popular', this.page);
  }

  get movieListValue() {
    return this.movieList;
  }
}

export default Store;
