const INITIAL_PAGE = 1;
class Page {
  #page: number;

  constructor() {
    this.#page = INITIAL_PAGE;
  }

  reset() {
    this.#page = INITIAL_PAGE;
  }

  getNextPage() {
    this.#page++;
    return this.#page;
  }
}

const page = new Page();
export default page;
