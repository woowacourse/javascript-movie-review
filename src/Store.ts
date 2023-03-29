import { fetchMovie, fetchMovies } from './fetch';

class Store {
  page: number;
  totalPages: number;
  searchWord: string;

  constructor() {
    this.page = 0;
    this.totalPages = 0;
    this.searchWord = '';
  }

  async getMovieList(value?: string) {
    this.page++;
    const params = value ? '/search/movie' : '/movie/popular';
    if (value) this.searchWord = value;
    const data = await fetchMovies(params, { page: this.page, query: value });
    this.totalPages = data.totalPages;
    return data.movies;
  }

  async getMovie(id: number) {
    const data = await fetchMovie(`/movie/${id}`);
    return data;
  }

  initPage() {
    this.page = 0;
  }

  initSearchWord() {
    this.searchWord = '';
  }
}

export default Store;
