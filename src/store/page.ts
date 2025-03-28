const INITIAL_PAGE = 1;
class Page {
  #page: number;
  #total: number;

  constructor() {
    this.#page = INITIAL_PAGE;
    this.#total = Infinity;
  }

  reset() {
    this.#page = INITIAL_PAGE;
    this.#total = Infinity;
  }

  getNextPage() {
    this.#page++;
    return this.#page;
  }

  getCurrentPage() {
    return this.#page;
  }

  setTotalPages(total: number) {
    this.#total = total;
  }

  hasNextPage() {
    return this.#page >= this.#total;
  }
}

const page = new Page();
export default page;
