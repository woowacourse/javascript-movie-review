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
    this.renderMovieList();
  }

  async renderMovieList() {
    this.render();
    this.toggleSkeletonList();
    await this.addMovieList();
    this.toggleSkeletonList();
    this.mountMovieList();
  }

  render() {
    const itemView = $(".item-view");

    const listTitle =
      this.#listState === LIST_STATE.POPULAR
        ? "지금 인기 있는 영화"
        : `"${this.#movieName}" 검색 결과`;

    itemView.innerHTML = `
    <card-list header='${listTitle}
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

      if (event.detail === "") {
        this.#listState = LIST_STATE.POPULAR;
        this.initRender();
      } else {
        this.renderMovieList(event.detail);
      }
    });

    document.addEventListener("click-home-button", () => {
      this.#listState = LIST_STATE.POPULAR;
      this.initRender();
    });
  }

  async appendMovieList() {
    this.#page += 1;
    this.#movieList = [];

    this.#listState === LIST_STATE.POPULAR
      ? await this.addMovieList()
      : await this.addMovieList();

    this.toggleSkeletonList();
    this.mountMovieList();
  }

  async addMovieList() {
    const fetchedData =
      this.#listState === LIST_STATE.POPULAR
        ? await getPopularMovies(this.#page)
        : await getSearchedMovies(this.#movieName, this.#page);

    const result = fetchedData.results;
    const newMovieList = result.map((item) => ({
      title: item.title,
      poster: item.poster_path,
      rating: item.vote_average,
    }));

    this.#movieList = [...this.#movieList, ...newMovieList];
  }

  mountMovieList() {
    $("card-list")?.setMovieList(this.#movieList);
  }

  toggleSkeletonList() {
    $("card-list").toggleSkeletonList();
  }
}
