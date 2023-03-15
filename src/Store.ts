import { fetchMovies } from './fetch';
import { Movie } from './types';

class Store {
  movieList: Movie[];
  page: number;
  totalPage: number;
  searchWord: string;

  constructor() {
    this.movieList = [];
    this.page = 0;
    this.totalPage = 0;
    this.searchWord = '';
  }

  async getMovieList(value?: string) {
    this.page++;
    if (value) {
      this.searchWord = value;
      await fetchMovies('/search/movie', this.page, value).then((data) => {
        this.movieList = data?.movies;
        this.totalPage = data?.total_pages;
      });
      return;
    }
    await fetchMovies('/movie/popular', this.page).then((data) => {
      this.movieList = data?.movies;
      this.totalPage = data?.total_pages;
    });
  }

  get movieListValue() {
    return this.movieList;
  }
}

export default Store;
