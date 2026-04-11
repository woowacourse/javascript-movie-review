class PageState {
  #page: number;
  #totalPages: number | null;

  constructor() {
    this.#page = 0;
    this.#totalPages = null;
  }

  getPage() {
    return this.#page;
  }

  incrementPage() {
    this.#page += 1;
  }

  setTotalPages(totalPages: number) {
    this.#totalPages = totalPages;
  }

  resetPage() {
    this.#page = 0;
    this.#totalPages = null;
  }

  isLastPage() {
    if (this.#totalPages === null) return false;
    return this.#page >= this.#totalPages;
  }
}

export default PageState;
