import { getSearchMovieResult } from "../api/getSearchMovieResult";
import mainElement from "../dom/mainElement";
import MovieListScrollManager from "../lib/scroll/MovieListScrollManager";
import { IMovieResult } from "../types/movieResultType";
import SearchMovieListView from "../view/SearchMovieListView";

class SearchMovieListController {
  #view;
  #scrollManager;

  #searchValue = "";
  #page = 0;
  #hasMore = false;
  #isLoading = false;

  #onDetailModalOpen;

  constructor({ onDetailModalOpen }: { onDetailModalOpen: (movieId: number) => void }) {
    this.#view = new SearchMovieListView(mainElement);
    this.#scrollManager = new MovieListScrollManager(this.#handleScroll.bind(this));

    this.#onDetailModalOpen = onDetailModalOpen;
  }

  async render(searchValue: string) {
    this.#searchValue = searchValue;
    this.#page = 0;
    const movieList = await this.#fetchMovies();
    this.#view.renderInitialList(movieList, this.#searchValue);
    this.#view.bindMovieClickEvent(this.#onDetailModalOpen);
    this.#scrollManager.bind();
  }

  removeScrollEvent() {
    this.#scrollManager.unbind();
  }

  async #fetchMovies() {
    const {
      page: newPage,
      total_pages: totalPage,
      results: movieList,
    }: IMovieResult = await getSearchMovieResult(this.#searchValue, this.#page + 1);

    this.#page = newPage;
    this.#hasMore = newPage !== totalPage;

    return movieList;
  }

  async #handleScroll() {
    if (!MovieListScrollManager.isNearBottom() || this.#isLoading || !this.#hasMore) return;

    this.#isLoading = true;
    const movieList = await this.#fetchMovies();
    this.#view.appendMovies(movieList);
    this.#isLoading = false;
  }
}

export default SearchMovieListController;
