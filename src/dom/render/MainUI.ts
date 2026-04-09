import { getPopularMovies, Movie } from "../../apis/movie/api";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { getPageParam, incrementPageParam } from "../../utils/pageParams";
import { renderBanner } from "./renderBanner";
import { renderThumbnailList } from "./renderThumbnailList";

type MainState =
  | { type: "loading" }
  | { type: "data"; movies: Movie[]; isLastPage: boolean }
  | { type: "error"; message: string }
  | { type: "empty" };

class MainUI {
  mainState: MainState = { type: "loading" };
  mainThumbnailList = document.getElementById("main-thumbnail-list");
  mainSeeMoreButton = document.getElementById("main-see-more-button");
  skeletonList = document.getElementById("skeleton-list");
  emptyContainer = document.getElementById("empty-container");
  errorContainer = document.getElementById("error-container");
  bannerContainer = document.getElementById("background-container");
  errorMessageContent = document.querySelector(
    "#error-container p",
  ) as HTMLParagraphElement;

  constructor() {
    this.#render();
  }

  setMainState(mainState: MainState) {
    this.mainState = mainState;
    this.#render();
  }

  hide() {
    this.mainThumbnailList?.classList.add("hidden");
    this.mainSeeMoreButton?.classList.add("hidden");
    this.skeletonList?.classList.add("hidden");
    this.emptyContainer?.classList.add("hidden");
    this.errorContainer?.classList.add("hidden");
    this.bannerContainer?.classList.add("hidden");
    this.errorMessageContent?.classList.add("hidden");
  }

  async load() {
    this.setMainState({ type: "loading" });
    try {
      const popularMovies = await getPopularMovies({ language: "ko-KR" });
      const isLastPage = popularMovies.page === popularMovies.total_pages;
      this.setMainState({
        type: "data",
        movies: popularMovies.results,
        isLastPage,
      });
    } catch (error) {
      this.setMainState({ type: "error", message: getErrorMessage(error) });
    }
  }

  async seeMore() {
    const popularMovies = await getPopularMovies({ page: getPageParam() + 1 });
    incrementPageParam();
    renderThumbnailList({
      movies: popularMovies.results,
      thumbnailListElement: this.mainThumbnailList,
    });
  }

  #render() {
    this.hide();
    if (this.mainState.type === "data") {
      this.mainThumbnailList?.classList.remove("hidden");
      renderThumbnailList({
        movies: this.mainState.movies,
        thumbnailListElement: this.mainThumbnailList,
      });

      const bannerMovieInfo = this.mainState.movies[0];
      if (bannerMovieInfo) renderBanner({ movie: bannerMovieInfo });

      if (!this.mainState.isLastPage)
        this.mainSeeMoreButton?.classList.remove("hidden");
      else {
        this.mainSeeMoreButton?.classList.add("hidden");
      }
    }

    if (this.mainState.type === "empty") {
      this.emptyContainer?.classList.remove("hidden");
    }

    if (this.mainState.type === "error") {
      this.errorContainer?.classList.remove("hidden");
      this.errorMessageContent.innerText = this.mainState.message;
    }

    if (this.mainState.type === "loading") {
      this.skeletonList?.classList.remove("hidden");
    }
  }
}

export default MainUI;
