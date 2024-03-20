import MovieItem from "../MovieItem/MovieItem";
import MoreMoviesButton from "../MoreMoviesButton/MoreMoviesButton";
import { getRetrievedMoviesData } from "../../api/getRetrievedMoviesData";
import { getPopularMoviesData } from "../../api/getPopularMoviesData";
import { $, createElement } from "../../utility/dom";

const MAX_PAGE_COUNT = 50;
class MovieList {
  #type: string;
  #title: string;
  #movieListSection;
  #pageCount = 1;

  constructor() {
    this.#title = "";
    this.#movieListSection = $(".item-view") as Element;
    this.#type = "popular";

    this.renderPopularMovieList();
    this.createMovieList();
    this.retrievedTitleHandler();
  }

  // searchMoviesByNameHandler()
  retrievedTitleHandler() {
    const formEl = $(".search-box");

    formEl?.addEventListener("submit", (event) => {
      event.preventDefault();

      this.#type = "search";
      this.#movieListSection.innerHTML = "";
      this.#pageCount = 1;

      const titleInput = (
        formEl.querySelector("input[type='text']") as HTMLInputElement
      ).value;

      this.renderRetrievedMovieList(titleInput);
      this.crateRetrievedMovieItems(titleInput);
    });
  }

  async crateRetrievedMovieItems(titleInput: string) {
    const ul = $("ul");

    const data = await getRetrievedMoviesData(
      this.#pageCount.toString(),
      titleInput
    );

    data.forEach(({ title, poster_path, vote_average }: IMovieItemData) => {
      const movieItem = new MovieItem({ title, poster_path, vote_average });
      ul?.appendChild(movieItem.createMovieItem());
    });

    this.#pageCount += 1;
  }

  async createPopularMovieItems() {
    const ul = $(".item-list");
    const data = await getPopularMoviesData(this.#pageCount.toString());

    data.forEach(({ title, poster_path, vote_average }: IMovieItemData) => {
      const movieItem = new MovieItem({ title, poster_path, vote_average });
      ul?.appendChild(movieItem.createMovieItem());
    });

    this.#pageCount += 1;
  }

  createMovieList() {
    if (this.#pageCount === MAX_PAGE_COUNT) this.renderMaxPageInfo();
    if (this.#pageCount > MAX_PAGE_COUNT) return;

    if (this.#type === "popular") this.createPopularMovieItems();
    if (this.#type === "search") this.crateRetrievedMovieItems(this.#title);
  }

  renderMaxPageInfo() {
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

  renderRetrievedMovieList(titleInput: string) {
    const movieListTitle = createElement("h2");
    movieListTitle.textContent = `"${titleInput}" 검색 결과`;

    const retrievedMovieListUl = createElement("ul", {
      class: "item-list",
    });

    const moreMoviesButton = MoreMoviesButton.createMoreMoviesButton();

    this.#movieListSection.appendChild(movieListTitle);
    this.#movieListSection.appendChild(retrievedMovieListUl);
    this.#movieListSection.appendChild(moreMoviesButton);

    moreMoviesButton.addEventListener("click", () => this.createMovieList());
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

    moreMoviesButton.addEventListener("click", () => this.createMovieList());
  }

  #removeMoreMoviesButton() {
    $(".btn")?.remove();
  }
}

export default MovieList;
