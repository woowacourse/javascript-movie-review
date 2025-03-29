import HeaderController from "../controller/HeaderController";
import MessageModalController from "../controller/MessageModalController";
import MovieListController from "../controller/MovieListController";
import SearchMovieListController from "../controller/SearchMovieListController";
import BackgroundThumbnailController from "../controller/BackgroundThumbnailController";
import MovieResults from "../domain/MovieResults";
import DetailModalController from "../controller/DetailModalController";
import StorageMovieResults from "../domain/StorageMovieResults";
import MovieItemOpenHandler from "../event/MovieItemOpenHandler";

class MainController {
  mainElement;
  movieResults;
  storageMovieResults;

  messageModalController!: MessageModalController;
  movieListController!: MovieListController;
  backgroundThumbnailController!: BackgroundThumbnailController;
  detailModalController!: DetailModalController;
  searchMovieListController!: SearchMovieListController;

  constructor() {
    this.mainElement = document.querySelector("main") as HTMLElement;
    this.movieResults = new MovieResults();
    this.storageMovieResults = new StorageMovieResults();
  }

  initController() {
    this.messageModalController = new MessageModalController();
    this.detailModalController = new DetailModalController({
      mainElement: this.mainElement,
      updateStarScore: (id, score) => this.storageMovieResults.updateStarScore(id, score),
    });

    this.movieListController = new MovieListController({
      mainElement: this.mainElement,
      movieResults: this.movieResults,
    });

    this.backgroundThumbnailController = new BackgroundThumbnailController({
      mainElement: this.mainElement,
      openDetailModal: (id: number) => this.openDetailModal(id),
    });

    this.searchMovieListController = new SearchMovieListController(this.mainElement);

    new HeaderController({
      renderSearchMovieList: (searchValue) => this.searchMovieListController.render(searchValue),
      renderMovieList: () => this.movieListController.render(),
    });
  }

  async render() {
    this.initController();
    await this.movieListController.render();
    await this.backgroundThumbnailController.render(this.movieResults.getFirstMovieItem());

    MovieItemOpenHandler(this.mainElement, this.openDetailModal.bind(this));
  }

  async openDetailModal(id: number) {
    const movieItem = await this.storageMovieResults.getDetailMovieResultById(id);
    this.detailModalController.changeContent(movieItem);
  }
}

export default MainController;
