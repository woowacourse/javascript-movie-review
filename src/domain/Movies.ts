import getPopularMovies from '../api/getPopularMovies';
import getSearchedMovies from '../api/getSearchedMovies';
import { ERROR_MESSAGE } from '../constants';
import { Movie, MovieAPIFailure, MovieAPIResponse } from '../types/movie';

class Movies {
  #query: string;

  #page: number;

  #totalPage: number;

  constructor() {
    this.#query = '';
    this.#page = 1;
    this.#totalPage = 500;
  }

  async init() {
    this.#query = '';
    this.#page = 1;

    const data = await getPopularMovies(this.#page);

    if ('status_message' in data) {
      return ERROR_MESSAGE;
    }

    this.#totalPage = Math.min(500, data.total_pages);

    return data.results;
  }

  async addPopular() {
    this.#page += 1;

    const data = await getPopularMovies(this.#page);

    if ('status_message' in data) {
      return ERROR_MESSAGE;
    }

    return data.results;
  }

  async search(query: string) {
    this.#query = query;
    this.#page = 1;

    const data = await getSearchedMovies(query);

    if ('status_message' in data) {
      return ERROR_MESSAGE;
    }

    this.#totalPage = Math.min(500, data.total_pages);

    return data.results;
  }

  async addSearch() {
    if (!this.#query) return;

    this.#page += 1;

    const data = await getSearchedMovies(this.#query, this.#page);

    if ('status_message' in data) {
      return ERROR_MESSAGE;
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
