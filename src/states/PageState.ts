class PageState {
  #page: number;

  constructor() {
    this.#page = 0;
  }

  getPage() {
    return this.#page;
  }

  incrementPage() {
    this.#page += 1;
  }

  resetPage() {
    this.#page = 0;
  }
}

export default PageState;
