import MovieList from "./MovieList";
import { getPopularMoviesData } from "../../api/getPopularMoviesData";
import { createElement, $ } from "../../utility/dom";
import { infiniteScroll } from "../../utility/infiniteScroll";

const MAX_PAGE_COUNT = 50;

class PopularMovieList extends MovieList {
  currentPage = 1;

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
      const movies = await getPopularMoviesData(this.currentPage.toString());

      const liList = this.createEmptyMovieItems(movies, ul);

      infiniteScroll.addInfiniteScroll(this.handlePopularPageEnd.bind(this));

      setTimeout(() => {
        this.updateMovieItemsWithData(movies, liList);
      }, 1000);

      this.currentPage += 1;
    } catch (error) {
      if (error instanceof Error) {
        this.createErrorUI(error.message);
      }
    }
  }

  async handlePopularPageEnd() {
    if (this.currentPage === MAX_PAGE_COUNT) {
      this.displayMaxPageInfo();
    }
    if (this.currentPage > MAX_PAGE_COUNT) {
      return;
    }

    await this.#createPopularMovieItems();
  }
}

export default PopularMovieList;
