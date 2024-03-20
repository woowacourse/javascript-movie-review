import MovieItem from "../MovieItem/MovieItem";
import MoreMoviesButton from "../MoreMoviesButton/MoreMoviesButton";
import { getSearchedMoviesData } from "../../api/getSearchedMoviesData";
import { getPopularMoviesData } from "../../api/getPopularMoviesData";
import { $, createElement } from "../../utility/dom";

const MAX_PAGE_PER_REQUEST = 20;
const MAX_PAGE_COUNT = 50;
class MovieList {
  #type: string;
  #title: string;
  #movieListSection;
  #currentPage = 1;

  constructor() {
    this.#title = "";
    this.#movieListSection = $(".item-view") as Element;
    this.#type = "popular";

    this.renderPopularMovieList();
    this.createPopularMovieList();
    this.setupSearchHandler();
  }

  setupSearchHandler() {
    const searchForm = $(".search-box");

    searchForm?.addEventListener("submit", (event) => {
      event.preventDefault();

      this.#type = "search";
      this.#movieListSection.innerHTML = "";
      this.#currentPage = 1;

      const titleInput = (
        searchForm.querySelector("input[type='text']") as HTMLInputElement
      ).value;

      this.#title = titleInput;

      this.renderSearchedMovies(titleInput);
      this.crateSearchedMovieItems(titleInput);
    });
  }

  async crateSearchedMovieItems(titleInput: string) {
    const ul = $("ul");

    const data = await getSearchedMoviesData(
      this.#currentPage.toString(),
      titleInput
    );

    data.forEach(({ title, poster_path, vote_average }: IMovieItemData) => {
      const movieItem = new MovieItem({ title, poster_path, vote_average });
      ul?.appendChild(movieItem.createMovieItem());
    });

    if (data.length === MAX_PAGE_PER_REQUEST) {
      this.#currentPage += 1;
      return;
    }

    this.#removeMoreMoviesButton();
    this.displayMaxPageInfo();
  }

  async createPopularMovieItems() {
    const ul = $(".item-list");
    const data = await getPopularMoviesData(this.#currentPage.toString());

    data.forEach(({ title, poster_path, vote_average }: IMovieItemData) => {
      const movieItem = new MovieItem({ title, poster_path, vote_average });
      ul?.appendChild(movieItem.createMovieItem());
    });

    this.#currentPage += 1;
  }

  createPopularMovieList() {
    if (this.#currentPage === MAX_PAGE_COUNT) this.displayMaxPageInfo();
    if (this.#currentPage > MAX_PAGE_COUNT) return;

    this.createPopularMovieItems();
  }

  createSearchedMovieList() {
    this.crateSearchedMovieItems(this.#title);
  }

  displayMaxPageInfo() {
    this.#removeMoreMoviesButton();
    const maxPageInfo = this.createMaxPageInfo();

    this.#movieListSection.appendChild(maxPageInfo);
  }

  createMaxPageInfo() {
    const maxPageInfoElement = createElement("p", {
      class: "max-page-info",
    });
    maxPageInfoElement.textContent = "마지막 페이지에 도달하였습니다 🚀";

    return maxPageInfoElement;
  }

  renderSearchedMovies(titleInput: string) {
    const movieListTitle = createElement("h2");
    movieListTitle.textContent = `"${titleInput}" 검색 결과`;

    const searchedMovieListUl = createElement("ul", {
      class: "item-list",
    });

    const moreMoviesButton = MoreMoviesButton.createMoreMoviesButton();

    this.#movieListSection.appendChild(movieListTitle);
    this.#movieListSection.appendChild(searchedMovieListUl);
    this.#movieListSection.appendChild(moreMoviesButton);

    moreMoviesButton.addEventListener("click", () =>
      this.createSearchedMovieList()
    );
  }

  renderPopularMovieList() {
    const movieListTitle = createElement("h2");
    movieListTitle.textContent = "지금 인기 있는 영화";

    const movieListUl = createElement("ul", {
      class: "item-list",
    });

    const moreMoviesButton = MoreMoviesButton.createMoreMoviesButton();

    this.#movieListSection.appendChild(movieListTitle);
    this.#movieListSection.appendChild(movieListUl);
    this.#movieListSection.appendChild(moreMoviesButton);

    moreMoviesButton.addEventListener("click", () =>
      this.createPopularMovieList()
    );
  }

  #removeMoreMoviesButton() {
    $(".btn")?.remove();
  }
}

export default MovieList;
