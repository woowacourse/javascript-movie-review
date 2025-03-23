import { getPopularMovieResult } from "../api/getPopularMovieResult";
import BackgroundThumbnailSection from "../component/BackgroundThumbnailSection";
import MovieItem from "../component/MovieItem";
import MovieListSection from "../component/MovieListSection";
import SkeletonBackgroundThumbnailSection from "../component/Skeleton/SkeletonBackgroundThumbnailSection";
import SkeletonMovieItem from "../component/Skeleton/SkeletonMovieItem";
import SkeletonMovieListSection from "../component/Skeleton/SkeletonMovieListSection";
import MovieResults from "../domain/MovieResults";
import { MovieItemType, MovieResultType } from "../types/movieResultType";

class MovieListController {
  movieResults;
  mainElement;
  openModal;

  constructor({
    mainElement,
    openModal,
  }: {
    mainElement: HTMLElement;
    openModal: (text: string) => void;
  }) {
    this.movieResults = MovieResults();
    this.mainElement = mainElement;
    this.openModal = openModal;
  }

  bindEvents() {
    const seeMoreElement = this.mainElement.querySelector(".see-more");
    seeMoreElement?.addEventListener("click", () => {
      this.addMovieList();
    });
  }

  async fetchAndStoreMovies(page: number = 1) {
    const {
      page: newPage,
      total_pages: totalPage,
      results: movieList,
    }: MovieResultType = await getPopularMovieResult(page);

    this.movieResults.addMovieList(newPage, movieList);
    this.movieResults.initialTotalPage(totalPage);

    return { movieList, hasMore: newPage !== totalPage };
  }

  async render() {
    const skeletonBackgroundElement = this.renderSkeleton();

    const { movieList, hasMore } = await this.fetchAndStoreMovies();
    this.renderMovieList({
      movieList,
      hasMore,
      skeletonBackgroundElement,
    });

    this.bindEvents();
  }

  renderSkeleton() {
    const skeletonSectionElement = SkeletonMovieListSection();
    this.mainElement.replaceChildren(skeletonSectionElement);
    const skeletonBackgroundElement = SkeletonBackgroundThumbnailSection();
    this.mainElement?.insertAdjacentElement(
      "beforebegin",
      skeletonBackgroundElement,
    );

    return skeletonBackgroundElement;
  }

  renderMovieList({
    movieList,
    hasMore,
    skeletonBackgroundElement,
  }: {
    movieList: MovieItemType[];
    hasMore: boolean;
    skeletonBackgroundElement: HTMLElement;
  }) {
    const sectionElement = MovieListSection({
      title: "지금 인기 있는 영화",
      movieList,
      hasMore,
    });
    this.mainElement.replaceChildren(sectionElement);

    const backgroundThumbnailSectionElement = BackgroundThumbnailSection(
      movieList[0],
    );
    skeletonBackgroundElement.replaceWith(backgroundThumbnailSectionElement);

    const detailButtonElement = backgroundThumbnailSectionElement.querySelector(
      "button.detail",
    ) as HTMLButtonElement;
    detailButtonElement.addEventListener("click", () =>
      this.openModal("아직 지원되지 않은 기능입니다."),
    );
  }

  renderBackgroundSection() {
    const skeletonBackgroundElement = SkeletonBackgroundThumbnailSection();
    this.mainElement?.insertAdjacentElement(
      "beforebegin",
      skeletonBackgroundElement,
    );

    return skeletonBackgroundElement;
  }

  async renderExistingMovieList() {
    const movieList = this.movieResults.getMovieList();
    const hasMore = this.movieResults.hasMore();
    const sectionElement = MovieListSection({
      title: "지금 인기 있는 영화",
      movieList,
      hasMore,
    });

    this.mainElement.replaceChildren(sectionElement);

    this.bindEvents();
  }

  async addMovieList() {
    const movieListContainer = this.mainElement.querySelector("ul");
    if (!movieListContainer) return;

    // 스켈레톤 추가
    const skeletonElements = Array.from({ length: 20 }, () =>
      SkeletonMovieItem(),
    );
    skeletonElements.forEach((skeleton) =>
      movieListContainer.appendChild(skeleton),
    );

    const { movieList, hasMore } = await this.fetchAndStoreMovies(
      this.movieResults.getPage() + 1,
    );

    // 스켈레톤 제거 후 새로운 영화 추가
    skeletonElements.forEach((skeleton) => skeleton.remove());
    movieList.forEach((movie) =>
      movieListContainer.appendChild(MovieItem(movie)),
    );

    if (!hasMore) this.mainElement.querySelector(".see-more")?.remove();
  }
}

export default MovieListController;
