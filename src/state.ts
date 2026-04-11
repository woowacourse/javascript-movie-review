import type { Genre } from "./api.ts";

class State {
  #nextPageNum = 0;
  #nextSearchPageNum = 0;
  #requestMovieCount = 0;
  #searchQuery = "";
  #genres: Genre[] = [];

  getNextPageNum() {
    return this.#nextPageNum;
  }

  getNextSearchPageNum() {
    return this.#nextSearchPageNum;
  }

  getRequestMovieCount() {
    return this.#requestMovieCount;
  }

  getSearchQuery() {
    return this.#searchQuery;
  }

  getGenres() {
    return this.#genres;
  }

  setNextPageNum(page: number) {
    this.#nextPageNum = page;
  }

  setNextSearchPageNum(page: number) {
    this.#nextSearchPageNum = page;
  }

  setRequestMovieCount(count: number) {
    this.#requestMovieCount = count;
  }

  setSearchQuery(query: string) {
    this.#searchQuery = query;
  }

  setGenres(genres: Genre[]) {
    this.#genres = genres;
  }
}

export default new State();
