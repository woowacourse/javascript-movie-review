export class AppState {
  #page: number;
  #isSearch: boolean;
  #searchValue: string;
  #currentMovie: string;

  constructor() {
    this.#page = 1;
    this.#isSearch = false;
    this.#searchValue = "";
    this.#currentMovie = "";
  }

  reset() {
    this.#page = 1;
    this.#isSearch = false;
    this.#searchValue = "";
  }

  resetSearch() {
    this.#page = 1;
    this.#isSearch = true;
    this.#searchValue = "";
  }

  getPage() {
    return this.#page;
  }

  getNextPage() {
    return this.#page + 1;
  }

  getSearchValue() {
    return this.#searchValue;
  }

  getIsSearch() {
    return this.#isSearch;
  }

  getCurrentMovie() {
    return this.#currentMovie;
  }

  increasePage() {
    this.#page++;
  }

  setValue(nextValue: string) {
    this.#searchValue = nextValue;
  }

  setIsSearch(nextIsSearch: boolean) {
    this.#isSearch = nextIsSearch;
  }

  setCurrentMovie(movieId: string) {
    this.#currentMovie = movieId;
  }
}
