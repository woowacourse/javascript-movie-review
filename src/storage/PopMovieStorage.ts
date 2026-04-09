import { MovieData } from '../api/types';

export default class PopMovieStorage {
  #PopMovieStorage: Map<string, MovieData[]>;

  constructor() {
    this.#PopMovieStorage = new Map<string, MovieData[]>();
  }

  hasMovie(page: string) {
    return this.#PopMovieStorage.has(page);
  }
  saveMovie(page: string, value: MovieData[]) {
    this.#PopMovieStorage.set(page, value);
  }

  getMovie(page: string) {
    if (this.hasMovie(page)) return;
    return this.#PopMovieStorage.get(page);
  }
}
