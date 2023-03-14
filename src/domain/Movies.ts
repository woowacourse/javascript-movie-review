import type { Movie } from "../types";

export class Movies {
  #list: Movie[];

  constructor(list: Movie[]) {
    this.#list = list;
  }

  getList(): Movie[] {
    return this.#list;
  }

  add(list: Movie[]) {
    this.#list = [...this.#list, ...list];
  }

  reset(list: Movie[]) {
    this.#list = list;
  }
}
