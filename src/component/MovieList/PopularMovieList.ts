import MovieList from "./MovieList";
import { getPopularMoviesData } from "../../api/getPopularMoviesData";
import { createElement, $ } from "../../utility/dom";

const MAX_PAGE_COUNT = 50;

class PopularMovieList extends MovieList {
  #currentPage = 1;

  constructor() {
    super();

    this.#renderPopularMovieList();
    this.#createPopularMovieItems();
  }

  #renderPopularMovieList() {
    const movieListTitle = createElement("h2");
    movieListTitle.textContent = "지금 인기 있는 영화";

    const movieListUl = createElement("ul", {
      class: "item-list",
    });

    this.movieListSection.appendChild(movieListTitle);
    this.movieListSection.appendChild(movieListUl);
  }

  async #createPopularMovieItems() {
    const ul = $(".item-list");

    try {
      const movies = await getPopularMoviesData(this.#currentPage.toString());

      const liList = this.createEmptyMovieItems(movies, ul);

      setTimeout(() => {
        this.updateMovieItemsWithData(movies, liList);

        if (this.#currentPage <= MAX_PAGE_COUNT) {
          this.removeMoreMoviesButton();

          const moreMoviesButton = this.createMoreMoviesButton();
          moreMoviesButton.addEventListener("click", () =>
            this.#handlePopularPageEnd()
          );
        }
      }, 1000);

      this.#currentPage += 1;
    } catch (error) {
      if (error instanceof Error) {
        this.createErrorUI(error.message);
      }
    }
  }

  #handlePopularPageEnd() {
    if (this.#currentPage === MAX_PAGE_COUNT) {
      this.displayMaxPageInfo();
    }
    if (this.#currentPage > MAX_PAGE_COUNT) {
      return;
    }

    this.#createPopularMovieItems();
  }
}

export default PopularMovieList;
