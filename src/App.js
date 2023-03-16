import { LIST_STATE } from "./constant/variables";
import { $ } from "./utils/Dom";
import { getPopularMovies, getSearchedMovies } from "./utils/fetch";

export default class App {
  #movieList = [];
  #page = 1;
  #listState = LIST_STATE.POPULAR;
  #movieName;

  constructor() {
    this.initRender();
    this.setEvent();
  }

  async initRender() {
    await this.addPopularMoviesList();
    this.render();
    this.mountMovieList();
  }

  render() {
    const itemView = $(".item-view");
    itemView.innerHTML = `
    <card-list header='${
      this.#listState === LIST_STATE.POPULAR
        ? "지금 인기 있는 영화"
        : `"${this.#movieName}" 검색 결과`
    }'></card-list>
    <more-button></more-button>
    `;
  }

  async setEvent() {
    document.addEventListener("more-button-clicked", () => {
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
  }

  async appendMovieList() {
    this.#page += 1;
    this.#movieList = [];
    if (this.#listState === LIST_STATE.POPULAR) {
      await this.addPopularMoviesList();
    }
    if (this.#listState === LIST_STATE.SEARCHED) {
      await this.addSearchedMoviesList();
    }
    this.toggleSkeletonList();
    this.mountMovieList();
  }

  async addPopularMoviesList() {
    const fetchedData = await getPopularMovies(this.#page);
    const result = fetchedData.results;
    result.forEach((item) => {
      this.#movieList.push({
        title: item.title,
        poster: item.poster_path,
        rating: item.vote_average,
      });
    });
  }

  async addSearchedMoviesList() {
    const fetchedData = await getSearchedMovies(this.#movieName, this.#page);
    const result = fetchedData.results;
    result.forEach((item) => {
      this.#movieList.push({
        title: item.title,
        poster: item.poster_path,
        rating: item.vote_average,
      });
    });
  }

  async renderSearchedMovies(movieName) {
    this.render();
    this.toggleSkeletonList();
    await this.addSearchedMoviesList();
    this.toggleSkeletonList();
    this.mountMovieList();
  }

  mountMovieList() {
    document.querySelector("card-list")?.setMovieList(this.#movieList);
  }

  toggleSkeletonList() {
    document.querySelector("card-list").toggleSkeletonList();
  }
}
