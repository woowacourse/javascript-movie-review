import getPopularMovies from '../api/getPopularMovies';
import getSearchedMovies from '../api/getSearchedMovies';
import { ERROR_MESSAGE, MAX_PAGE } from '../constants';

class Movies {
  #query: string;

  #page: number;

  #totalPage: number;

  constructor() {
    this.#query = '';
    this.#page = 1;
    this.#totalPage = MAX_PAGE;
  }

  async init() {
    this.#query = '';
    this.#page = 1;

    const data = await getPopularMovies(this.#page);

    if ('status_message' in data) {
      return ERROR_MESSAGE.DATA_LOAD;
    }

    this.#totalPage = Math.min(MAX_PAGE, data.total_pages);

    return data.results;
  }

  async addPopular() {
    this.#page += 1;

    const data = await getPopularMovies(this.#page);

    if ('status_message' in data) {
      return ERROR_MESSAGE.DATA_LOAD;
    }

    return data.results;
  }

  async search(query: string) {
    this.#query = query;
    this.#page = 1;

    const data = await getSearchedMovies(query);

    if ('status_message' in data) {
      return ERROR_MESSAGE.DATA_LOAD;
    }

    this.#totalPage = Math.min(MAX_PAGE, data.total_pages);

    return data.results;
  }

  async addSearch() {
    if (!this.#query) return;

    this.#page += 1;

    const data = await getSearchedMovies(this.#query, this.#page);

    if ('status_message' in data) {
      return ERROR_MESSAGE.DATA_LOAD;
    }

    return data.results;
  }

  isLastPage() {
    return this.#page === this.#totalPage;
  }

  previousPage() {
    this.#page -= 1;
  }

  getQuery() {
    return this.#query;
  }

  getPage() {
    return this.#page;
  }
}

export default Movies;
