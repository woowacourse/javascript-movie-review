import MovieList from "./MovieList";
import { getSearchedMoviesData } from "../../api/getSearchedMoviesData";
import { $, createElement } from "../../utility/dom";
import { infiniteScroll } from "../../utility/infiniteScroll";

const MAX_PAGE_PER_REQUEST = 20;

class SearchedMovieList extends MovieList {
  #currentPage = 1;
  #title = "";

  constructor(title: string) {
    super();

    this.#title = title;

    this.#renderSearchedMovieList();
    this.#createSearchedMovieItems();
  }

  #renderSearchedMovieList() {
    const movieListTitle = createElement("h2");
    movieListTitle.textContent = `"${this.#title}" 검색 결과`;

    const searchedMovieListUl = createElement("ul", {
      class: "item-list",
    });

    this.movieListSection.appendChild(movieListTitle);
    this.movieListSection.appendChild(searchedMovieListUl);
  }

  async #createSearchedMovieItems() {
    const ul = $(".item-list");

    try {
      const movies = await this.#getSearchedMoviesData();
      const liList = this.createEmptyMovieItems(movies, ul);

      infiniteScroll.addInfiniteScroll(async () => {
        this.#handleSearchedPageEnd(movies);
      });

      setTimeout(() => {
        this.updateMovieItemsWithData(movies, liList);
      }, 1000);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        this.createErrorUI(error.message);
      }
    }
  }

  async #getSearchedMoviesData() {
    return await getSearchedMoviesData(
      this.#currentPage.toString(),
      this.#title
    );
  }

  async #handleSearchedPageEnd(data: IMovieItemData[]) {
    if (data.length === MAX_PAGE_PER_REQUEST) {
      await this.#createSearchedMovieItems();

      this.#currentPage += 1;
      return;
    }

    this.displayMaxPageInfo();
  }
}

export default SearchedMovieList;
