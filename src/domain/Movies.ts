import getPopularMovies from '../api/getPopularMovies';
import getSearchedMovies from '../api/getSearchedMovies';
import { Movie } from '../types/movie';

class Movies {
  #list: Movie[] = [];

  #query: string | undefined;

  #page: number = 1;

  constructor() {}

  async init() {
    this.#page = 1;
    const { results } = await getPopularMovies(this.#page);
    this.#list = results;
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
    const { results } = await getSearchedMovies(query);
    this.#list = results;
  }

  async addSearch() {
    if (!this.#query) return;

    this.#page += 1;
    const { results } = await getSearchedMovies(this.#query, this.#page);
    this.#list = [...this.#list, ...results];

    return results;
  }

  get() {
    return this.#list;
  }
}

export default Movies;
