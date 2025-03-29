import HeaderController from "../controller/HeaderController";
import MessageModalController from "../controller/MessageModalController";
import MovieListController from "../controller/MovieListController";
import SearchMovieListController from "../controller/SearchMovieListController";
import BackgroundThumbnailController from "../controller/BackgroundThumbnailController";
import MovieResults from "../domain/MovieResults";
import DetailModalController from "../controller/DetailModalController";
import StorageMovieResults from "../domain/StorageMovieResults";

class MainController {
  movieResults;
  StorageMovieResults;
  mainElement;
  messageModalController;
  movieListController;
  backgroundThumbnailController;
  detailModalController;
  searchMovieListController;

  constructor() {
    this.movieResults = new MovieResults();
    this.StorageMovieResults = new StorageMovieResults();

    this.mainElement = document.querySelector("main") as HTMLElement;

    this.messageModalController = new MessageModalController(this.mainElement);
    this.detailModalController = new DetailModalController({
      mainElement: this.mainElement,
      updateStarScore: (id, score) => this.StorageMovieResults.updateStarScore(id, score),
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
    await this.movieListController.render();
    await this.backgroundThumbnailController.render(this.movieResults.getFirstMovieItem());
    this.bindEvents();
  }

  async openDetailModal(id: number) {
    const movieItem = await this.StorageMovieResults.getDetailMovieResultById(id);
    this.detailModalController.changeContent(movieItem);
  }

  bindEvents() {
    this.mainElement.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      const item = target.closest("div.item");

      if (item) this.openDetailModal(Number(item.id));
    });
  }
}

export default MainController;
