import { MAX_PAGE } from '../constants';
import type { AppMovie } from '../types/domain';

class Movies {
  #query: string;

  #page: number;

  #totalPages: number;

  #movies: AppMovie[];

  constructor(query: string = '') {
    this.#query = query;
    this.#page = 1;
    this.#totalPages = MAX_PAGE;
    this.#movies = [];
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

  add(movies: AppMovie[]) {
    this.#movies = [...this.#movies, ...movies];
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
    this.#movies = [];
  }
}

export default Movies;
