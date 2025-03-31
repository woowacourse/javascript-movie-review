import { getPopularMovieResult } from "../api/getPopularMovieResult";
import mainElement from "../dom/mainElement";
import MovieListModel from "../domain/MovieListModel";
import MovieListScrollManager from "../lib/scroll/MovieListScrollManager";
import { IMovieItem, IMovieResult } from "../types/movieResultType";
import MovieListView from "../view/MovieListView";

class MovieListController {
  #model;
  #view;
  #scrollManager: MovieListScrollManager;

  isLoading = false;

  #onFetchMovieList;
  #onDetailModalOpen;

  constructor({
    onFetchMovieList,
    onDetailModalOpen,
  }: {
    onFetchMovieList: (movie: IMovieItem) => void;
    onDetailModalOpen: (movieId: number) => void;
  }) {
    this.#model = MovieListModel();
    this.#view = new MovieListView(mainElement);
    this.#scrollManager = new MovieListScrollManager(this.#handleScroll.bind(this));

    this.#onFetchMovieList = onFetchMovieList;
    this.#onDetailModalOpen = onDetailModalOpen;
  }

  async render() {
    const movieList = await this.#fetchAndStoreMovies();
    this.#view.renderInitialList(movieList);
    this.#view.bindMovieClickEvent(this.#onDetailModalOpen);
    this.#scrollManager.bind();

    this.#onFetchMovieList(movieList[0]);
  }

  async renderExistingMovieList() {
    const movieList = this.#model.getMovieList();
    this.#view.renderInitialList(movieList);
    this.#view.bindMovieClickEvent(this.#onDetailModalOpen);
    this.#scrollManager.bind();
  }

  removeScrollEvent() {
    this.#scrollManager.unbind();
  }

  async #fetchAndStoreMovies(page: number = 1) {
    const {
      page: newPage,
      total_pages: totalPage,
      results: movieList,
    }: IMovieResult = await getPopularMovieResult(page);

    this.#model.addMovieList(newPage, movieList);
    this.#model.initializeTotalPage(totalPage);

    return movieList;
  }

  async #handleScroll() {
    if (!MovieListScrollManager.isNearBottom() || this.isLoading || !this.#model.hasMore()) return;

    this.isLoading = true;
    const movieList = await this.#fetchAndStoreMovies(this.#model.getPage() + 1);
    this.#view.appendMovies(movieList);
    this.isLoading = false;
  }
}

export default MovieListController;
