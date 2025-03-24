import { getSearchMovieResult } from "../api/getSearchMovieResult";
import MovieEmptySection from "../component/MovieEmptySection";
import MovieItem from "../component/MovieItem";
import MovieListSection from "../component/MovieListSection";
import SkeletonMovieItem from "../component/Skeleton/SkeletonMovieItem";
import SkeletonMovieListSection from "../component/Skeleton/SkeletonMovieListSection";
import { MovieItemType, MovieResultType } from "../types/movieResultType";

class SearchMovieListController {
  mainElement;
  searchText;
  page = 0;

  constructor(mainElement: HTMLElement, searchText: string) {
    this.mainElement = mainElement;
    this.searchText = searchText;

    this.render();
  }

  bindEvents() {
    const seeMoreElement = this.mainElement.querySelector(".see-more");
    seeMoreElement?.addEventListener("click", () => {
      this.addMovieList();
    });
  }

  async fetchMovies() {
    const {
      page: newPage,
      total_pages: totalPage,
      results: movieList,
    }: MovieResultType = await getSearchMovieResult(
      this.searchText,
      this.page + 1,
    );
    this.page = newPage;

    const hasMore = newPage !== totalPage;

    return { movieList, hasMore };
  }

  async render() {
    this.renderSkeleton();

    const { movieList, hasMore } = await this.fetchMovies();

    this.renderSearchMovieList({ movieList, hasMore });

    this.bindEvents();
  }

  renderSkeleton() {
    const skeletonSectionElement = SkeletonMovieListSection();
    this.mainElement.replaceChildren(skeletonSectionElement);
  }

  renderSearchMovieList({
    movieList,
    hasMore,
  }: {
    movieList: MovieItemType[];
    hasMore: boolean;
  }) {
    let sectionElement;
    if (movieList.length !== 0) {
      sectionElement = MovieListSection({
        title: `"${this.searchText}" 검색 결과`,
        movieList,
        hasMore,
      });
    } else {
      sectionElement = MovieEmptySection(`"${this.searchText}" 검색 결과`);
    }

    this.mainElement.replaceChildren(sectionElement);
  }

  async addMovieList() {
    const movieListContainer = this.mainElement.querySelector("ul");
    if (!movieListContainer) return;

    // 스켈레톤 추가
    const skeletonElements = Array.from({ length: 20 }, () =>
      SkeletonMovieItem(),
    );
    skeletonElements.forEach((skeletonElement) => {
      movieListContainer?.appendChild(skeletonElement);
    });

    const { movieList, hasMore } = await this.fetchMovies();

    // 스켈레톤 제거 후 새로운 영화 추가
    skeletonElements.forEach((skeletonElement) => {
      skeletonElement.remove();
    });
    movieList.forEach((movie) => {
      movieListContainer?.appendChild(MovieItem(movie));
    });

    if (!hasMore) this.mainElement.querySelector(".see-more")?.remove();
  }
}

export default SearchMovieListController;
