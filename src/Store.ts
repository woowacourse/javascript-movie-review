import { fetchMovies, fetchGenre } from './fetch';
import { Movie, MovieList } from './types';
import { ErrorAlert } from './UI/errorAlert';
class Store {
  movieList: Movie[];
  page: number;
  totalPage: number;
  searchWord: string;
  genre: Array<{ id: number; name: string }>;

  constructor() {
    this.movieList = [];
    this.page = 0;
    this.totalPage = 0;
    this.searchWord = '';
    this.genre = [];
    this.getGenreStandard();
  }

  async getGenreStandard() {
    try {
      fetchGenre().then((data) => {
        this.genre = data;
      });
    } catch (error) {
      if (error instanceof Error) ErrorAlert(error.message);
    }
  }

  async allocateData(value?: string) {
    try {
      this.page++;
      if (value) {
        this.searchWord = value;
        const data = await fetchMovies('/search/movie', this.page, value);
        if (data) this.setMovieData(data);
        return;
      }
      const data = await fetchMovies('/movie/popular', this.page);
      if (data) this.setMovieData(data);
    } catch (error) {
      if (error instanceof Error) ErrorAlert(error.message);
    }
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
