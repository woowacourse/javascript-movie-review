import { LIST_STATE } from "./constant/variables";
import { $ } from "./utils/Dom";
import { getPopularMovies, getSearchedMovies } from "./utils/fetch";

export default class App {
  #movieList;
  #page;
  #listState = LIST_STATE.POPULAR;
  #movieName;

  constructor() {
    this.initRender();
    this.setEvent();
  }

  async initRender() {
    this.#movieList = [];
    this.#page = 1;
    this.render();
    this.toggleSkeletonList();
    await this.addMovieList();
    this.mountMovieList();
  }

  render() {
    if (null) return;

    const itemView = $(".item-view");

    itemView.innerHTML = `
    <card-list header='${
      this.#listState === LIST_STATE.POPULAR
        ? "지금 인기 있는 영화"
        : `"${this.#movieName}" 검색 결과`
    }
    '></card-list>
    <more-button></more-button>
    `;
  }

  async setEvent() {
    document.addEventListener("click-more-button", () => {
      this.toggleSkeletonList();
      this.appendMovieList();
    });

    document.addEventListener("search-movie", (event) => {
      this.#listState = LIST_STATE.SEARCHED;
      this.#page = 1;
      this.#movieList = [];
      this.#movieName = event.detail;
      this.renderSearchedMovies(event.detail);
    });

    document.addEventListener("click-home-button", () => {
      this.initRender();
    });
  }

  async appendMovieList() {
    this.#page += 1;
    this.#movieList = [];
    if (this.#listState === LIST_STATE.POPULAR) {
      await this.addMovieList();
    }
    if (this.#listState === LIST_STATE.SEARCHED) {
      await this.addMovieList();
    }
    this.toggleSkeletonList();
    this.mountMovieList();
  }

  async addMovieList() {
    const fetchedData =
      this.#listState === LIST_STATE.POPULAR
        ? await getPopularMovies(this.#page)
        : await getSearchedMovies(this.#movieName, this.#page);

    const result = fetchedData.results;
    result.forEach((item) => {
      this.#movieList.push({
        title: item.title,
        poster: item.poster_path,
        rating: item.vote_average,
      });
    });
  }

  async renderSearchedMovies() {
    this.render();
    this.toggleSkeletonList();
    await this.addMovieList();
    this.toggleSkeletonList();
    this.mountMovieList();
  }

  mountMovieList() {
    $("card-list")?.setMovieList(this.#movieList);
  }

  toggleSkeletonList() {
    $("card-list").toggleSkeletonList();
  }
}
