import { fetchMovies } from './fetch';
import { Movie, MovieList } from './types';

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

  async allocateData(value?: string) {
    this.page++;
    if (value) {
      this.searchWord = value;
      await fetchMovies('/search/movie', this.page, value).then((data) => {
        if (data) this.setMovieData(data);
      });
      return;
    }
    await fetchMovies('/movie/popular', this.page).then((data) => {
      if (data) this.setMovieData(data);
    });
  }

  setMovieData(data: MovieList) {
    this.movieList = data?.movies;
    this.totalPage = data?.total_pages;
  }

  get movieListValue() {
    return this.movieList;
  }

  setInitPage(value: number) {
    this.page = value;
  }

  setInitSearchWord() {
    this.searchWord = '';
  }
}

export default Store;
