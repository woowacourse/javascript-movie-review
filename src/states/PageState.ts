class PageState {
  #page: number;

  constructor() {
    this.#page = 1;
  }

  getPage() {
    return this.#page;
  }

  incrementPage() {
    this.#page += 1;
  }

  resetPage() {
    this.#page = 1;
  }
}

export default PageState;
