import PopularMovieList from "../component/MovieList/PopularMovieList";
import SearchedMovieList from "../component/MovieList/SearchedMovieList";
import { $ } from "../utility/dom";
import hangsungImg from "../image/wooteco-icon.png";

class MovieListController {
  #type: string;

  #popularMovieList;
  #movieListSection;

  constructor() {
    this.#type = "type";
    this.#movieListSection = $(".item-view") as Element;
    this.#popularMovieList = new PopularMovieList();

    this.#setupSearchHandler();
  }

  #setupSearchHandler() {
    const searchForm = $(".search-box");

    searchForm?.addEventListener("submit", (event) => {
      event.preventDefault();

      this.#type = "search";
      this.#movieListSection.innerHTML = "";

      const titleInput = (
        searchForm.querySelector("input[type='text']") as HTMLInputElement
      ).value;

      const searchedMovieList = new SearchedMovieList(titleInput);
    });
  }

  createErrorUI(message: String) {
    const mainElement = $("main");
    if (mainElement) {
      mainElement.innerHTML = `
      <section class="section-error">
        <img class="wooteco-icon" src="${hangsungImg}"></img>
        <p class="error-message">${message}</p>
      </section>
    `;
    }
  }
}

export default MovieListController;
