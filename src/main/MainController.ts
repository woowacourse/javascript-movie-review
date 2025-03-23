import { ERROR_MESSAGE } from "../constant/errorMessage";
import HeaderController from "../controller/HeaderController";
import MessageModalController from "../controller/MessageModalController";
import MovieListController from "../controller/MovieListController";
import SearchMovieListController from "../controller/SearchMovieListController";
import BackgroundThumbnailController from "../controller/BackgroundThumbnailController";

class MainController {
  mainElement;
  messageModalController;
  movieListController;
  backgroundThumbnailController;

  constructor() {
    this.mainElement = document.querySelector("main") as HTMLElement;

    this.messageModalController = new MessageModalController(this.mainElement);

    this.movieListController = new MovieListController(this.mainElement);

    this.backgroundThumbnailController = new BackgroundThumbnailController({
      mainElement: this.mainElement,
      openModal: (text: string) => {
        this.messageModalController.changeContentMessage(text);
        this.messageModalController.messageModalElement.showModal();
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
      const movieItem = await this.movieListController.render();
      await this.backgroundThumbnailController.render(movieItem);
    } catch (error) {
      console.log(error);
      this.messageModalController.changeContentMessage(
        ERROR_MESSAGE[Number((error as Error).message)] ||
          "알 수 없는 오류가 발생했습니다.",
      );
      this.messageModalController.messageModalElement.showModal();
    }
  }
}

export default MainController;
