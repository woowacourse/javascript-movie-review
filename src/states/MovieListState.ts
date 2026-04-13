class MovieListState {
  #total_pages: number | null;

  constructor() {
    this.#total_pages = null;
  }

  getTotalPages() {
    return this.#total_pages;
  }

  setTotalPages(total_pages: number) {
    this.#total_pages = total_pages;
  }
}

export default MovieListState;
