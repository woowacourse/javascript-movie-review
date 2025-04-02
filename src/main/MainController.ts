import HeaderController from "../controller/HeaderController";
import MessageModalController from "../controller/MessageModalController";
import MovieListController from "../controller/MovieListController";
import SearchMovieListController from "../controller/SearchMovieListController";
import BackgroundThumbnailController from "../controller/BackgroundThumbnailController";
import PopularMovieResults from "../domain/PopularMovieResults";
import DetailModalController from "../controller/DetailModalController";
import DetailMovieResults from "../domain/DetailMovieResults";
import MovieItemOpenHandler from "../event/MovieItemOpenHandler";

class MainController {
  mainElement;
  PopularMovieResults;
  detailMovieResults;

  messageModalController!: MessageModalController;
  movieListController!: MovieListController;
  backgroundThumbnailController!: BackgroundThumbnailController;
  detailModalController!: DetailModalController;
  searchMovieListController!: SearchMovieListController;

  constructor() {
    this.mainElement = document.querySelector("main") as HTMLElement;
    this.PopularMovieResults = new PopularMovieResults();
    this.detailMovieResults = new DetailMovieResults();

    this.initController();
  }

  initController() {
    this.messageModalController = new MessageModalController();
    this.detailModalController = new DetailModalController({
      mainElement: this.mainElement,
      updateStarScore: (id, score) => this.detailMovieResults.updateStarScore(id, score),
    });

    this.movieListController = new MovieListController({
      mainElement: this.mainElement,
      PopularMovieResults: this.PopularMovieResults,
    });

    this.backgroundThumbnailController = new BackgroundThumbnailController({
      mainElement: this.mainElement,
      openDetailModal: (id: number) => this.openDetailModal(id),
    });

    this.searchMovieListController = new SearchMovieListController(this.mainElement);

    new HeaderController({
      renderSearchMovieList: (searchValue) => this.searchMovieListController.initialize(searchValue),
      renderMovieList: () => this.movieListController.initialize(),
    });
  }

  async render() {
    await this.movieListController.initialize();
    await this.backgroundThumbnailController.initialize(this.PopularMovieResults.getFirstMovieItem());

    MovieItemOpenHandler(this.mainElement, this.openDetailModal.bind(this));
  }

  async openDetailModal(id: number) {
    const movieItem = await this.detailMovieResults.getDetailMovieResultById(id);
    this.detailModalController.initialize(movieItem);
  }
}

export default MainController;
