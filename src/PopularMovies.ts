import { fetchMovies } from "./movieAPIResponse.ts";
import type { Movie } from "../types/Movie.ts";

class PopularMovies {
  #currentPage = 1;
  #totalPages = 0;
  #movies: Movie[] = [];

  async fetch() {
    const data = await fetchMovies(this.#currentPage);
    this.#movies = data.results;
    this.#totalPages = data.total_pages;
  }

  async loadMore() {
    this.#currentPage += 1;
    await this.fetch();
  }

  get movies() {
    return this.#movies;
  }

  get isLastPage() {
    return this.#currentPage === this.#totalPages;
  }
}

export default PopularMovies;
