import type { Genre } from "./api.ts";

class State {
  #nextPageNum = 0;
  #nextSearchPageNum = 0;
  #requestMovieCount = 0;
  #searchQuery = "";
  #genres: Genre[] = [];
  #isLoading = false;
  #totalPages = 0;
  #totalSearchPages = 0;

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

  getIsLoading() {
    return this.#isLoading;
  }

  getTotalPages() {
    return this.#totalPages;
  }

  getTotalSearchPages() {
    return this.#totalSearchPages;
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

  setIsLoading(loading: boolean) {
    this.#isLoading = loading;
  }

  setTotalPages(pages: number) {
    this.#totalPages = pages;
  }

  setTotalSearchPages(pages: number) {
    this.#totalSearchPages = pages;
  }
}

export default new State();
