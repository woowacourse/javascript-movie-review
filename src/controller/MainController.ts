import { IMovieItem } from "./../types/movieResultType";
import { ERROR_MESSAGE } from "../constant/errorMessage";
import BackgroundThumbnailController from "./BackgroundThumbnailController";
import HeaderController from "./HeaderController";
import MessageModalController from "./MessageModalController";
import MovieListController from "./MovieListController";
import SearchMovieListController from "./SearchMovieListController";

class MainController {
  mainElement;
  backgroundThumbnailController;
  messageModalController;
  movieListController;

  constructor() {
    this.mainElement = document.querySelector("main") as HTMLElement;

    this.messageModalController = new MessageModalController(this.mainElement);

    this.backgroundThumbnailController = new BackgroundThumbnailController({
      openModal: (text: string) => {
        this.messageModalController.changeContentMessage(text);
        this.messageModalController.messageModalElement.showModal();
      },
    });

    this.movieListController = new MovieListController({
      mainElement: this.mainElement,
      renderBackgroundThumbnailSkeleton: () => {
        this.backgroundThumbnailController.renderSkeleton();
      },
      renderBackgroundThumbnail: (movie: IMovieItem) => {
        this.backgroundThumbnailController.renderBackgroundThumbnail(movie);
      },
    });

    new HeaderController({
      renderSearchMovieList: (searchValue) =>
        new SearchMovieListController(this.mainElement, searchValue),
      renderMovieList: () => this.movieListController.renderExistingMovieList(),
    });
  }

  async render() {
    try {
      await this.movieListController.render();
    } catch (error) {
      this.messageModalController.changeContentMessage(
        ERROR_MESSAGE[Number((error as Error).message)] ||
          "알 수 없는 오류가 발생했습니다.",
      );
      this.messageModalController.messageModalElement.showModal();
    }
  }
}

export default MainController;
