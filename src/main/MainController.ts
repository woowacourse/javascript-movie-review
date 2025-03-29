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
  searchMovieListController;

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

    this.searchMovieListController = new SearchMovieListController(this.mainElement);

    new HeaderController({
      renderSearchMovieList: (searchValue) => this.searchMovieListController.render(searchValue),
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
    this.bindObserver();
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

  bindObserver() {
    const seeMore = this.mainElement.querySelector(".see-more") as Element;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // 스크롤이 빠르게 내려갈 경우 → 감지 → 데이터 로딩 → 아직도 보이는 중 → 또 감지 (방지하고자, 감지 해제후, 비동기처리가 끝나면 다시 감지)
          observer.unobserve(seeMore);
          this.handleSeeMore().finally(() => {
            observer.observe(seeMore);
          });
        }
      },
      {
        root: null,
        threshold: 0.1,
      },
    );
    observer.observe(seeMore);
  }
}

export default MainController;
