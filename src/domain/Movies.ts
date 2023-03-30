import { MAX_PAGE } from '../constants';

class Movies {
  #query: string;

  #page: number;

  #totalPages: number;

  constructor(query: string = '') {
    this.#query = query;
    this.#page = 1;
    this.#totalPages = MAX_PAGE;
  }

  getPage() {
    return this.#page;
  }

  getQuery() {
    return this.#query;
  }

  setTotalPages(totalPages: number) {
    this.#totalPages = Math.min(totalPages, this.#totalPages);
  }

  isCurrentQuery(currentQuery: string) {
    return currentQuery === this.#query;
  }

  isPageInRange() {
    return this.#page <= this.#totalPages;
  }

  addPage() {
    this.#page += 1;
  }

  reset(query: string) {
    this.#page = 1;
    this.#query = query;
    this.#totalPages = MAX_PAGE;
  }
}

export default Movies;
