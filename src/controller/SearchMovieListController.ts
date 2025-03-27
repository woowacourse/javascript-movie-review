import { getSearchMovieResult } from "../api/getSearchMovieResult";
import MovieEmptySection from "../component/MovieEmptySection";
import MovieItem from "../component/MovieItem";
import MovieListSection from "../component/MovieListSection";
import mainElement from "../dom/mainElement";
import { IMovieItem, IMovieResult } from "../types/movieResultType";
import { $ } from "../util/selector";

class SearchMovieListController {
  mainElement;
  searchText;
  page = 0;

  constructor(searchText: string) {
    this.mainElement = mainElement;
    this.searchText = searchText;
  }

  async render() {
    const { movieList, hasMore } = await this.#fetchMovies();
    this.#renderSearchMovieList({ movieList, hasMore });

    this.#bindEvents();
  }

  async addMovieList() {
    const movieListContainer = $("ul", this.mainElement);
    if (!movieListContainer) return;

    const { movieList, hasMore } = await this.#fetchMovies();

    movieListContainer?.append(...movieList.map((movie) => MovieItem(movie)));

    if (!hasMore) $(".see-more", this.mainElement)?.remove();
  }

  async #fetchMovies() {
    const {
      page: newPage,
      total_pages: totalPage,
      results: movieList,
    }: IMovieResult = await getSearchMovieResult(this.searchText, this.page + 1);
    this.page = newPage;

    const hasMore = newPage !== totalPage;

    return { movieList, hasMore };
  }

  #renderSearchMovieList({ movieList, hasMore }: { movieList: IMovieItem[]; hasMore: boolean }) {
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

  #bindEvents() {
    const seeMoreElement = $(".see-more", this.mainElement);
    seeMoreElement?.addEventListener("click", () => {
      this.addMovieList();
    });
  }
}

export default SearchMovieListController;
