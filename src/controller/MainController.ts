import { ERROR_MESSAGE } from "../constant/errorMessage";
import { scrollToTop } from "../util/scroll";
import BackgroundThumbnailController from "./BackgroundThumbnailController";
import DetailModalController from "./DetailModalController";
import HeaderController from "./HeaderController";
import MessageModalController from "./MessageModalController";
import MovieListController from "./MovieListController";
import SearchMovieListController from "./SearchMovieListController";

class MainController {
  static instance: MainController;

  backgroundThumbnailController;
  movieListController;
  searchMovieListController;
  messageModalController;
  detailModalController;

  constructor() {
    scrollToTop();
    this.messageModalController = new MessageModalController();
    this.detailModalController = new DetailModalController({
      onErrorModalOpen: this.#onErrorModalOpen.bind(this),
    });

    this.backgroundThumbnailController = new BackgroundThumbnailController({
      onMovieDetailButtonClick: (movieId: number) => {
        this.detailModalController.showModal(movieId);
      },
    });

    this.movieListController = new MovieListController({
      onFetchMovieList: (movie) => {
        this.backgroundThumbnailController.render(movie);
      },
      onDetailModalOpen: (movieId: number) => {
        this.detailModalController.showModal(movieId);
      },
    });

    this.searchMovieListController = new SearchMovieListController({
      onDetailModalOpen: (movieId: number) => {
        this.detailModalController.showModal(movieId);
      },
    });

    new HeaderController({
      onSearchKeywordSubmit: this.#onSearchKeywordSubmit.bind(this),
      onHomeLogoClick: this.#onHomeLogoClick.bind(this),
    });

    // 싱글톤 패턴 적용
    if (MainController.instance) {
      return MainController.instance;
    }
    MainController.instance = this;
  }

  async render() {
    try {
      await this.movieListController.render();
    } catch (error) {
      this.#onErrorModalOpen(error as Error);
    }
  }

  async #onSearchKeywordSubmit(searchValue: string) {
    scrollToTop();

    try {
      this.backgroundThumbnailController.hideBackground();
      this.movieListController.removeScrollEvent();
      await this.searchMovieListController.render(searchValue);
    } catch (error) {
      this.#onErrorModalOpen(error as Error);
    }
  }

  #onHomeLogoClick() {
    scrollToTop();

    this.backgroundThumbnailController.showBackground();
    this.searchMovieListController.removeScrollEvent();
    this.movieListController.renderExistingMovieList();
  }

  #onErrorModalOpen(error: Error) {
    this.messageModalController.showModal(ERROR_MESSAGE[Number(error.message)] || "알 수 없는 오류가 발생했습니다.");
  }
}

export default MainController;
