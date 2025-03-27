import { getPopularMovieResult } from "../api/getPopularMovieResult";
import MovieItem from "../component/MovieItem";
import MovieListSection from "../component/MovieListSection";
import SkeletonMovieItem from "../component/Skeleton/SkeletonMovieItem";
import mainElement from "../dom/mainElement";
import MovieResults from "../domain/MovieResults";
import { IMovieResult } from "../types/movieResultType";
import { $ } from "../util/selector";

class MovieListController {
  movieResults;
  mainElement;

  constructor() {
    this.movieResults = MovieResults();
    this.mainElement = mainElement;
  }

  bindEvents() {
    const seeMoreElement = $(".see-more", this.mainElement);
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

  async render() {}

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
    const movieListContainer = $("ul", this.mainElement);
    if (!movieListContainer) return;

    // 스켈레톤 추가
    const skeletonElements = Array.from({ length: 20 }, () =>
      SkeletonMovieItem(),
    );
    movieListContainer.append(...skeletonElements);

    const { movieList, hasMore } = await this.fetchAndStoreMovies(
      this.movieResults.getPage() + 1,
    );

    // 스켈레톤 제거 후 새로운 영화 추가
    skeletonElements.forEach((skeleton) => skeleton.remove());
    movieListContainer.append(...movieList.map((movie) => MovieItem(movie)));

    if (!hasMore) $(".see-more", this.mainElement)?.remove();
  }
}

export default MovieListController;
