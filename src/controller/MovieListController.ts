import PopularMovieList from "../component/MovieList/PopularMovieList";
import SearchedMovieList from "../component/MovieList/SearchedMovieList";
import { $ } from "../utility/dom";

class MovieListController {
  #popularMovieList;
  #movieListSection;

  constructor() {
    this.#movieListSection = $(".item-view") as Element;
    this.#popularMovieList = new PopularMovieList();

    this.#setupSearchHandler();
  }

  #setupSearchHandler() {
    const searchForm = $(".search-box");

    searchForm?.addEventListener("submit", (event) => {
      event.preventDefault();

      this.#movieListSection.innerHTML = "";

      const titleInput = (
        searchForm.querySelector("input[type='text']") as HTMLInputElement
      ).value;

      const searchedMovieList = new SearchedMovieList(titleInput);
    });
  }
}

export default MovieListController;
