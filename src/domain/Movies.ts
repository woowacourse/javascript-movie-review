import getPopularMovies from '../api/getPopularMovies';
import getSearchedMovies from '../api/getSearchedMovies';
import { Movie } from '../types/movie';

class Movies {
  #list: Movie[];

  #query: string;

  #page: number;

  #totalPage: number;

  constructor() {
    this.#list = [];
    this.#query = '';
    this.#page = 1;
    this.#totalPage = 500;
  }

  async init() {
    this.#query = '';
    this.#page = 1;
    const { results, total_pages } = await getPopularMovies(this.#page);
    this.#list = results;
    this.#totalPage = Math.min(500, total_pages);
  }

  async addPopular() {
    this.#page += 1;
    const { results } = await getPopularMovies(this.#page);
    this.#list = [...this.#list, ...results];

    return results;
  }

  async search(query: string) {
    this.#query = query;
    this.#page = 1;
    const { results, total_pages } = await getSearchedMovies(query);

    this.#list = results;
    this.#totalPage = Math.min(500, total_pages);
  }

  async addSearch() {
    if (!this.#query) return;

    this.#page += 1;
    const { results } = await getSearchedMovies(this.#query, this.#page);
    this.#list = [...this.#list, ...results];

    return results;
  }

  isLastPage() {
    return this.#page === this.#totalPage;
  }

  get() {
    return this.#list;
  }

  getQuery() {
    return this.#query;
  }

  getPage() {
    return this.#page;
  }
}

export default Movies;
