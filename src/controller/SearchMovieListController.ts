import { getSearchMovieResult } from "../api/getSearchMovieResult";
import MovieItem from "../component/MovieItem";
import MovieListSection from "../component/MovieListSection";
import { IMovieResult } from "../types/movieResultType";

class SearchMovieListController {
  sectionElement;
  searchText;
  page = 0;

  constructor(sectionElement: HTMLElement, searchText: string) {
    this.sectionElement = sectionElement;
    this.searchText = searchText;

    this.renderMovieList();
  }

  bindEvents() {
    const seeMoreElement = this.sectionElement.querySelector(".see-more");
    seeMoreElement?.addEventListener("click", () => {
      this.addMovieList();
    });
  }

  async getSearchMovieList() {
    const { page: newPage, results: movieList }: IMovieResult =
      await getSearchMovieResult(this.searchText, this.page + 1);
    this.page = newPage;

    return movieList;
  }

  async renderMovieList() {
    const movieList = await this.getSearchMovieList();

    const sectionElement = MovieListSection(
      `"${this.searchText}" 겅색 결과`,
      movieList,
    );

    this.sectionElement.replaceWith(sectionElement);
    this.sectionElement = sectionElement;

    this.bindEvents();
  }

  async addMovieList() {
    const movieList = await this.getSearchMovieList();

    movieList.forEach((movie) => {
      this.sectionElement.querySelector("ul")?.appendChild(MovieItem(movie));
    });
  }
}

export default SearchMovieListController;
