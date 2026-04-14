import { Movie } from "../../types/movie";
import { fetchPopularMovies, fetchSearchedMovies } from "../api/fetchMovies";

import { extractThumbnailInfo } from "../thumnailManager";
import MovieListView from "../View/MovieListView";

class MovieListController {
  #movieListView;
  #state;

  constructor(movieListView: MovieListView) {
    this.#movieListView = movieListView;

    this.#state = {
      mode: "popular",
      page: 1,
      totalPages: 1,
      searchQuery: "",
      isLoading: false,
    };
  }

  async loadInitialPopular() {
    this.#state.mode = "popular";
    this.#state.page = 1;
    this.#state.searchQuery = "";
    this.#movieListView.remove();
    this.#movieListView.removeTopMargin();

    await this.#loadCurrentPage();
  }

  async search(query: string) {
    this.#state.mode = "search";
    this.#state.page = 1;
    this.#state.searchQuery = query;

    this.#movieListView.remove();
    this.#movieListView.addTopMargin();
    this.#movieListView.hideNotFound();
    this.#movieListView.renderTitle(`"${query}"검색 결과`);

    await this.#loadCurrentPage();
  }

  async loadNextPage() {
    if (this.#state.isLoading) {
      return;
    }
    if (this.#state.page >= this.#state.totalPages) {
      return;
    }

    const nextPage = this.#state.page + 1;
    await this.#loadPage(nextPage);
  }

  async #loadCurrentPage() {
    await this.#loadPage(this.#state.page);
  }

  async #loadPage(page: number) {
    try {
      this.#state.isLoading = true;
      this.#movieListView.addSkeletons();

      const { movies, nowPage, totalPages } = await this.#requestMovies(page);

      this.#state.page = nowPage;
      this.#state.totalPages = totalPages;

      this.#renderMovies(movies, nowPage);
    } catch (error) {
      alert((error as Error).message);
    } finally {
      this.#state.isLoading = false;
      this.#movieListView.removeAllSkeletons();
    }
  }

  #renderMovies(movies: Movie[], page: number) {
    if (movies.length === 0 && this.#state.mode === "search" && page === 1) {
      this.#movieListView.showNotFound();
    }

    this.#movieListView.addMovies(extractThumbnailInfo(movies));
  }

  #requestMovies(page: number) {
    if (this.#state.mode === "search") {
      return fetchSearchedMovies(page, this.#state.searchQuery);
    }

    return fetchPopularMovies(page);
  }
}

export default MovieListController;
