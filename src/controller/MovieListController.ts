import { getPopularMovieResult } from "../api/getPopularMovieResult";
import MovieItem from "../component/MovieItem";
import MovieListSection from "../component/MovieListSection";
import SkeletonMovieItem from "../component/Skeleton/SkeletonMovieItem";
import SkeletonMovieListSection from "../component/Skeleton/SkeletonMovieListSection";
import MovieResults from "../domain/MovieResults";
import { IMovieItem, IMovieResult } from "../types/movieResultType";

class MovieListController {
  movieResults;
  mainElement;

  renderBackgroundThumbnailSkeleton;
  renderBackgroundThumbnail;

  constructor({
    mainElement,
    renderBackgroundThumbnailSkeleton,
    renderBackgroundThumbnail,
  }: {
    mainElement: HTMLElement;
    renderBackgroundThumbnailSkeleton: () => void;
    renderBackgroundThumbnail: (movie: IMovieItem) => void;
  }) {
    this.movieResults = MovieResults();
    this.mainElement = mainElement;
    this.renderBackgroundThumbnailSkeleton = renderBackgroundThumbnailSkeleton;
    this.renderBackgroundThumbnail = renderBackgroundThumbnail;
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
    }: IMovieResult = await getPopularMovieResult(page);

    this.movieResults.addMovieList(newPage, movieList);
    this.movieResults.initializeTotalPage(totalPage);

    return { movieList, hasMore: newPage !== totalPage };
  }

  async render() {
    this.renderSkeleton();
    this.renderBackgroundThumbnailSkeleton();

    const { movieList, hasMore } = await this.fetchAndStoreMovies();
    this.renderMovieList({
      movieList,
      hasMore,
    });
    this.renderBackgroundThumbnail(movieList[0]);

    this.bindEvents();
  }

  renderSkeleton() {
    const skeletonSectionElement = SkeletonMovieListSection();
    this.mainElement.replaceChildren(skeletonSectionElement);
  }

  renderMovieList({
    movieList,
    hasMore,
  }: {
    movieList: IMovieItem[];
    hasMore: boolean;
  }) {
    const sectionElement = MovieListSection({
      title: "지금 인기 있는 영화",
      movieList,
      hasMore,
    });
    this.mainElement.replaceChildren(sectionElement);
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
