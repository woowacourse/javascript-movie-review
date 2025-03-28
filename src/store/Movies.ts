import { MovieType } from "../types/MovieType";

class StoreMovies {
  #movieList: MovieType[];

  constructor() {
    this.#movieList = [];
  }

  get movieList() {
    return this.#movieList;
  }

  updateMovies(movies: MovieType[]) {
    this.#movieList = movies;
  }

  addMovies(movies: MovieType[]) {
    this.#movieList = [...this.#movieList, ...movies];
  }
}

const storeMovies = new StoreMovies();
export default storeMovies;
