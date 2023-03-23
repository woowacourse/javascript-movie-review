import getMovieById from '../api/getMovieById';
import getPopularMovies from '../api/getPopularMovies';
import getSearchedMovies from '../api/getSearchedMovies';
import { ERROR_MESSAGE, MAX_PAGE } from '../constants';
import type { Rate } from '../types/movie';

class Movies {
  #query: string;

  #page: number;

  #totalPage: number;

  #rate: Rate[];

  constructor() {
    this.#query = '';
    this.#page = 1;
    this.#totalPage = MAX_PAGE;
    this.#rate = [];
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

  addRate(rate: Rate) {
    if (this.#rate.find((item: Rate) => item.id === rate.id)) {
      this.#rate.forEach((item) => {
        if (item.id === rate.id) {
          item.rate = rate.rate;
        }
      });
      return;
    }

    this.#rate.push(rate);
    return;
  }

  getRateById(id: number) {
    return this.#rate.find((item) => item.id === id);
  }

  getById(id: string) {
    const a = getMovieById(id);
    console.log(a);
  }

  getQuery() {
    return this.#query;
  }

  getPage() {
    return this.#page;
  }
}

export default Movies;
