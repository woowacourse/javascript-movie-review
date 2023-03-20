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

    const { total_pages: totalPages, results } = await getPopularMovies(this.#page);

    this.#totalPage = Math.min(MAX_PAGE, totalPages);

    return results;
  }

  async addPopular() {
    this.#page += 1;

    const { results } = await getPopularMovies(this.#page);

    return results;
  }

  async search(query: string) {
    this.#query = query;
    this.#page = 1;

    const { total_pages: totalPages, results } = await getSearchedMovies(query);

    this.#totalPage = Math.min(MAX_PAGE, totalPages);

    return results;
  }

  async addSearch() {
    if (!this.#query) return;

    this.#page += 1;

    const { results } = await getSearchedMovies(this.#query, this.#page);

    return results;
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
