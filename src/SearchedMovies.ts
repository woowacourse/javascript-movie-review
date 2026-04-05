import { fetchSearchedMovies } from "./movieAPIResponse.ts";
import type { Movie } from "../types/Movie.ts";

class SearchedMovies {
  #currentPage = 1;
  #totalPages = 0;
  #movies: Movie[] = [];

  async fetch(keyword: string) {
    const data = await fetchSearchedMovies(keyword, this.#currentPage);
    this.#movies = data.results;
    this.#totalPages = data.total_pages;
  }

  async loadMore(keyword: string) {
    this.#currentPage += 1;
    await this.fetch(keyword);
  }

  get movies() {
    return this.#movies;
  }

  get isLastPage() {
    return this.#currentPage === this.#totalPages;
  }

  reset() {
    this.#currentPage = 1;
  }
}

export default SearchedMovies;
