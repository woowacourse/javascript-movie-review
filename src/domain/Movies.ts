import { AppMovie } from '../types/movie';

class Movies {
  #query: string;

  #page: number;

  #movies: AppMovie[];

  constructor(query: string = '') {
    this.#query = query;
    this.#page = 0;
    this.#movies = [];
  }

  getPage() {
    return this.#page;
  }

  add(movies: AppMovie[]) {
    this.#movies = [...this.#movies, ...movies];
  }

  isCurrentQuery(currentQuery: string) {
    return currentQuery === this.#query;
  }

  isLastPage(totalPages: number) {
    return this.#page === totalPages;
  }

  addPage() {
    this.#page += 1;
  }

  previousPage() {
    this.#page -= 1;
  }

  reset(query: string) {
    this.#page = 0;
    this.#query = query;
    this.#movies = [];
  }
}

export default Movies;
