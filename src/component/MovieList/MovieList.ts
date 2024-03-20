import MovieItem from "../MovieItem/MovieItem";
import MoreMoviesButton from "../MoreMoviesButton/MoreMoviesButton";
import { getMovieData } from "../../api/getMovieData";
import { getPopularMoviesData } from "../../api/getPopularMoviesData";
import { $, createElement } from "../../utility/dom";

const MAX_PAGE_COUNT = 50;

class MovieList {
  #movieListSection;
  #pageCount = 1;

  constructor() {
    this.#movieListSection = $(".item-view") as Element;

    this.renderMovieList();
    this.createMovieList();
  }

  async createMovieItems() {
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

    this.createMovieItems();
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

  renderMovieList() {
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
