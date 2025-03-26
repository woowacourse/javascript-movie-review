import { ERROR_MESSAGE } from "../constant/errorMessage";
import HeaderController from "../controller/HeaderController";
import MessageModalController from "../controller/MessageModalController";
import MovieListController from "../controller/MovieListController";
import SearchMovieListController from "../controller/SearchMovieListController";
import BackgroundThumbnailController from "../controller/BackgroundThumbnailController";
import { MovieResultType } from "../types/movieResultType";
import { getPopularMovieResult } from "../api/getPopularMovieResult";
import MovieResults from "../domain/MovieResults";

class MainController {
  movieResults;
  mainElement;
  messageModalController;
  movieListController;
  backgroundThumbnailController;

  constructor() {
    this.movieResults = new MovieResults();

    this.mainElement = document.querySelector("main") as HTMLElement;

    this.messageModalController = new MessageModalController(this.mainElement);

    this.movieListController = new MovieListController(this.mainElement, this.handleSeeMore.bind(this));

    this.backgroundThumbnailController = new BackgroundThumbnailController({
      mainElement: this.mainElement,
      openModal: (text: string) => {
        this.messageModalController.changeContentMessage(text);
        this.messageModalController.messageModalElement.showModal();
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
    const nextPage = this.movieResults.getPage() + 1;
    const { movieList, newPage, totalPage } = await this.fetchAndStoreMovies(nextPage);

    this.movieListController.addMovieList({
      movieList,
      hasMore: newPage !== totalPage,
    });
  }
}

export default MainController;
