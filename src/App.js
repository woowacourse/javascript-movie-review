import Header from "./components/MovieHeader";
import { LIST_STATE } from "./constant/variables";
import { $ } from "./utils/Dom";
import { getPopularMovies, getSearchedMovies } from "./utils/fetch";

export default class App {
  #movieList = [];
  #page = 1;
  #listState = LIST_STATE.POPULAR;
  #movieName = "";

  constructor() {
    this.init(); //영화 초기 20개 불러오기
    new Header();
    this.initEventHandler();
  }

  async init() {
    await this.getPopularMoviesList();
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

  setEvent() {
    const moreButton = $("#more-button");
    moreButton.addEventListener("click", () => {});
  }

  async initEventHandler() {
    document.addEventListener("more-button-clicked", async () => {
      if (this.#listState === LIST_STATE.POPULAR) this.appendPopularMovieList();
      if (this.#listState === LIST_STATE.SEARCHED)
        this.appendSearchedMovieList();
    });

    document.addEventListener("search-movie", (event) => {
      this.#listState = LIST_STATE.SEARCHED;
      this.#page = 1;
      this.#movieName = event.detail;
      this.renderSearchedMovies(event.detail);
    });
  }

  async appendPopularMovieList() {
    this.#page += 1;
    this.#movieList = [];
    await this.getPopularMoviesList();

    this.mountMovieList();
  }

  async appendSearchedMovieList() {
    this.#page += 1;
    this.#movieList = [];
    await this.getSearchedMoviesList();

    this.mountMovieList();
  }

  async getPopularMoviesList() {
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

  async getSearchedMoviesList() {
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

    const searchedMovies = await getSearchedMovies(movieName, 1);
    this.#movieList = [];

    searchedMovies.results.forEach((item) => {
      this.#movieList.push({
        title: item.title,
        poster: item.poster_path,
        rating: item.vote_average,
      });
    });

    this.mountMovieList();
  }

  mountMovieList() {
    document.querySelector("card-list")?.setMovieList(this.#movieList);
  }
}
