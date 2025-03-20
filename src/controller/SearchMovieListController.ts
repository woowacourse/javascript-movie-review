import { getSearchMovieResult } from "../api/getSearchMovieResult";
import MovieEmptySection from "../component/MovieEmptySection";
import MovieItem from "../component/MovieItem";
import MovieListSection from "../component/MovieListSection";
import SkeletonMovieItem from "../component/Skeleton/SkeletonMovieItem";
import SkeletonMovieListSection from "../component/Skeleton/SkeletonMovieListSection";
import { IMovieResult } from "../types/movieResultType";

class SearchMovieListController {
  mainElement;
  searchText;
  page = 0;

  constructor(mainElement: HTMLElement, searchText: string) {
    this.mainElement = mainElement;
    this.searchText = searchText;

    this.renderMovieList();
  }

  bindEvents() {
    const seeMoreElement = this.mainElement.querySelector(".see-more");
    seeMoreElement?.addEventListener("click", () => {
      this.addMovieList();
    });
  }

  async getSearchMovieList() {
    const {
      page: newPage,
      total_pages: totalPage,
      results: movieList,
    }: IMovieResult = await getSearchMovieResult(
      this.searchText,
      this.page + 1,
    );
    this.page = newPage;

    const hasMore = newPage !== totalPage;

    return { movieList, hasMore };
  }

  async renderMovieList() {
    const skeletonSectionElement = SkeletonMovieListSection();
    this.mainElement.replaceChildren(skeletonSectionElement);

    const { movieList, hasMore } = await this.getSearchMovieList();

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

    this.bindEvents();
  }

  async addMovieList() {
    const skeletonElements = Array.from({ length: 20 }).map(() =>
      SkeletonMovieItem(),
    );

    skeletonElements.forEach((skeletonElement) => {
      this.mainElement.querySelector("ul")?.appendChild(skeletonElement);
    });

    const { movieList, hasMore } = await this.getSearchMovieList();

    skeletonElements.forEach((skeletonElement) => {
      skeletonElement.remove();
    });

    movieList.forEach((movie) => {
      this.mainElement.querySelector("ul")?.appendChild(MovieItem(movie));
    });

    if (!hasMore) this.mainElement.querySelector(".see-more")?.remove();
  }
}

export default SearchMovieListController;
