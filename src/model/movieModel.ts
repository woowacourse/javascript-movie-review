import { PAGE_NUMBER } from "../constants/constant";

class MovieModel implements StateType {
  #page = PAGE_NUMBER;
  #isSearch = false;
  #searchValue = "";
  #isLoading = false;

  startSearch(newPage: number, newIsSearch: boolean, newSearchValue: string) {
    this.page = newPage;
    this.isSearch = newIsSearch;
    this.searchValue = newSearchValue;
  };

  get isLoading() {
    return this.#isLoading;
  };

  set isLoading(newLoading: boolean) {
    this.#isLoading = newLoading;
  };

  increasePage() {
    this.#page += 1;
  };

  decreasePage() {
    this.#page -= 1;
  };

  get page() {
    return this.#page;
  };

  get isSearch() {
    return this.#isSearch;
  };

  get searchValue() {
    return this.#searchValue;
  };

  set page(newPage: number) {
    this.#page = newPage;
  };

  set isSearch(newIsSearch: boolean) {
    this.#isSearch = newIsSearch;
  };

  set searchValue(newSearchValue: string) {
    this.#searchValue = newSearchValue;
  };
}

export const movieModel = new MovieModel();
