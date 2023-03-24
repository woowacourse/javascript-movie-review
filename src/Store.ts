import { fetchMovie, fetchMovies } from './fetch';
import { Movie, MovieList } from './types';

class Store {
  movieList: readonly Movie[];
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
      await fetchMovies('/search/movie', {
        page: this.page,
        query: value,
      }).then((data) => {
        if (data) this.setMovieData(data);
      });
      return;
    }
    await fetchMovies('/movie/popular', { page: this.page }).then((data) => {
      if (data) this.setMovieData(data);
    });
  }

  async getMovie(id: number) {
    const data = await fetchMovie(`/movie/${id}`);
    return data;
  }

  setMovieData(data: MovieList) {
    this.movieList = data?.movies;
    this.totalPage = data?.totalPages;
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
