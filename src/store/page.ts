class Page {
  #page: number;

  constructor() {
    this.#page = 1;
  }

  getPage() {
    this.#page++;
    return this.#page;
  }
}

const page = new Page();
export default page;
