import { getSearchMovieResult } from "../api/getSearchMovieResult";
import MovieEmptySection from "../component/MovieEmptySection";
import MovieItem from "../component/MovieItem";
import MovieListSection from "../component/MovieListSection";
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
    }: MovieResultType = await getSearchMovieResult(this.searchText, this.page + 1);
    this.page = newPage;

    const hasMore = newPage !== totalPage;

    return { movieList, hasMore };
  }

  async render() {
    this.mainElement.innerHTML = "";

    const { movieList, hasMore } = await this.fetchMovies();

    this.renderSearchMovieList({ movieList, hasMore });

    this.bindEvents();
  }

  renderSearchMovieList({ movieList, hasMore }: { movieList: MovieItemType[]; hasMore: boolean }) {
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

    this.mainElement.appendChild(sectionElement);
  }

  async addMovieList() {
    const movieListContainer = this.mainElement.querySelector("ul");
    if (!movieListContainer) return;

    const { movieList, hasMore } = await this.fetchMovies();

    movieList.forEach((movie) => {
      movieListContainer?.appendChild(MovieItem(movie));
    });

    if (!hasMore) this.mainElement.querySelector(".see-more")?.remove();
  }
}

export default SearchMovieListController;
