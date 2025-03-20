import { getPopularMovieResult } from "../api/getPopularMovieResult";
import BackgroundThumbnailSection from "../component/BackgroundThumbnailSection";
import MovieItem from "../component/MovieItem";
import MovieListSection from "../component/MovieListSection";
import SkeletonBackgroundThumbnailSection from "../component/Skeleton/SkeletonBackgroundThumbnailSection";
import SkeletonMovieItem from "../component/Skeleton/SkeletonMovieItem";
import SkeletonMovieListSection from "../component/Skeleton/SkeletonMovieListSection";
import MovieResults from "../domain/MovieResults";
import { IMovieResult } from "../types/movieResultType";

class MovieListController {
  movieResults;
  mainElement;

  constructor(mainElement: HTMLElement) {
    this.movieResults = MovieResults();
    this.mainElement = mainElement;
  }

  bindEvents() {
    const seeMoreElement = this.mainElement.querySelector(".see-more");
    seeMoreElement?.addEventListener("click", () => {
      this.addMovieList();
    });
  }

  async getPopularMovieList(page: number = 1) {
    const {
      page: newPage,
      total_pages: totalPage,
      results: movieList,
    }: IMovieResult = await getPopularMovieResult(page);

    this.movieResults.addMovieList(newPage, movieList); // 도메인 업데이트
    this.movieResults.initialTotalPage(totalPage);

    const hasMore = newPage !== totalPage;

    return { movieList, hasMore };
  }

  async renderMovieList() {
    const skeletonSectionElement = SkeletonMovieListSection();
    this.mainElement.replaceChildren(skeletonSectionElement);
    const skeletonBackgroundElement = SkeletonBackgroundThumbnailSection();
    this.mainElement?.insertAdjacentElement(
      "beforebegin",
      skeletonBackgroundElement,
    );

    const { movieList, hasMore } = await this.getPopularMovieList();
    const sectionElement = MovieListSection({
      title: "지금 인기 있는 영화",
      movieList,
      hasMore,
    });

    skeletonBackgroundElement.replaceWith(
      BackgroundThumbnailSection(movieList[0]),
    );

    this.mainElement.replaceChildren(sectionElement);
    this.bindEvents();
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
    const skeletonElements = Array.from({ length: 20 }).map(() =>
      SkeletonMovieItem(),
    );

    skeletonElements.forEach((skeletonElement) => {
      this.mainElement.querySelector("ul")?.appendChild(skeletonElement);
    });

    const { movieList, hasMore } = await this.getPopularMovieList(
      this.movieResults.getPage() + 1,
    );

    skeletonElements.forEach((skeletonElement) => {
      skeletonElement.remove();
    });

    movieList.forEach((movie) => {
      this.mainElement.querySelector("ul")?.appendChild(MovieItem(movie));
    });

    if (!hasMore) this.mainElement.querySelector(".see-more")?.remove();
  }
}

export default MovieListController;
