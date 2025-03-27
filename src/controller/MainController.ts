import { ERROR_MESSAGE } from "../constant/errorMessage";
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
  messageModalController;
  detailModalController;

  constructor() {
    this.messageModalController = new MessageModalController();
    this.detailModalController = new DetailModalController();

    this.backgroundThumbnailController = new BackgroundThumbnailController({
      onMovieDetailButtonClick: () => {
        this.detailModalController.showModal();
      },
    });

    this.movieListController = new MovieListController({
      onAfterFetchMovieList: (movie) => {
        this.backgroundThumbnailController.renderBackgroundThumbnail(movie);
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
      this.#openModal(ERROR_MESSAGE[Number((error as Error).message)] || "알 수 없는 오류가 발생했습니다.");
    }
  }

  #openModal(text: string) {
    this.messageModalController.changeContentMessage(text);
    this.messageModalController.showModal();
  }

  async #onSearchKeywordSubmit(searchValue: string) {
    try {
      this.backgroundThumbnailController.hideBackground();
      const searchMovieListController = new SearchMovieListController(searchValue);
      await searchMovieListController.render();
    } catch (error) {
      this.#openModal(ERROR_MESSAGE[Number((error as Error).message)] || "알 수 없는 오류가 발생했습니다.");
    }
  }

  #onHomeLogoClick() {
    this.backgroundThumbnailController.showBackground();
    this.movieListController.renderExistingMovieList();
  }
}

export default MainController;
