import { ERROR_MESSAGE } from "../constant/errorMessage";
import HeaderController from "../controller/HeaderController";
import MessageModalController from "../controller/MessageModalController";
import MovieListController from "../controller/MovieListController";
import SearchMovieListController from "../controller/SearchMovieListController";
import BackgroundThumbnailController from "../controller/BackgroundThumbnailController";
import { MovieResultType } from "../types/movieResultType";
import { getPopularMovieResult } from "../api/getPopularMovieResult";
import MovieResults from "../domain/MovieResults";
import DetailModalController from "../controller/DetailModalController";
import StorageMovieResults from "../domain/StorageMovieResults";
import Spinner from "../component/Spinner";

class MainController {
  movieResults;
  StorageMovieResults;
  mainElement;
  spinnerElement;
  messageModalController;
  movieListController;
  backgroundThumbnailController;
  detailModalController;
  constructor() {
    this.movieResults = new MovieResults();
    this.StorageMovieResults = new StorageMovieResults();

    this.mainElement = document.querySelector("main") as HTMLElement;

    this.spinnerElement = Spinner();
    this.mainElement.insertAdjacentElement("beforebegin", this.spinnerElement);

    this.messageModalController = new MessageModalController(this.mainElement);
    this.detailModalController = new DetailModalController({
      mainElement: this.mainElement,
      updateStarScore: (id, score) => this.StorageMovieResults.updateStarScore(id, score),
    });

    this.movieListController = new MovieListController({
      mainElement: this.mainElement,
      handleSeeMore: this.handleSeeMore.bind(this),
      openDetailModal: async (id) => {
        this.spinnerElement.classList.add("active");
        const movieItem = await this.StorageMovieResults.getDetailMovieResultById(id);
        this.spinnerElement.classList.remove("active");
        this.detailModalController.changeContent(movieItem);
      },
    });

    this.backgroundThumbnailController = new BackgroundThumbnailController({
      mainElement: this.mainElement,
      openDetailModal: async (id: number) => {
        const movieItem = await this.StorageMovieResults.getDetailMovieResultById(id);
        this.detailModalController.changeContent(movieItem);
      },
    });

    new HeaderController({
      renderSearchMovieList: (searchValue) => new SearchMovieListController(this.mainElement, searchValue),
      renderMovieList: () => {
        const movieList = this.movieResults.getMovieList();
        const hasMore = this.movieResults.hasMore();
        this.movieListController.render({ movieList, hasMore });
      },
    });
  }

  async render() {
    this.spinnerElement.classList.add("active");

    try {
      const { movieList, newPage, totalPage } = await this.fetchAndStoreMovies();
      this.movieListController.render({
        movieList,
        hasMore: newPage !== totalPage,
      });
      // thumbnail 렌더 예시
      await this.backgroundThumbnailController.render(movieList[0]);
    } catch (error) {
      this.messageModalController.changeContentMessage(
        ERROR_MESSAGE[Number((error as Error).message)] || "알 수 없는 오류가 발생했습니다.",
      );
      this.messageModalController.messageModalElement.showModal();
    }
    this.spinnerElement.classList.remove("active");
  }

  async fetchAndStoreMovies(page: number = 1) {
    const {
      page: newPage,
      total_pages: totalPage,
      results: movieList,
    }: MovieResultType = await getPopularMovieResult(page);

    this.movieResults.addMovieList(newPage, movieList);
    this.movieResults.initialTotalPage(totalPage);

    return { movieList, newPage, totalPage };
  }

  async handleSeeMore() {
    this.spinnerElement.classList.add("active");

    const nextPage = this.movieResults.getPage() + 1;
    const { movieList, newPage, totalPage } = await this.fetchAndStoreMovies(nextPage);

    this.spinnerElement.classList.remove("active");

    this.movieListController.addMovieList({
      movieList,
      hasMore: newPage !== totalPage,
    });
  }
}

export default MainController;
