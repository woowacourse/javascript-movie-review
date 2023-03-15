import Header from "./components/MovieHeader";
import { $ } from "./utils/Dom";
import { getPopularMovies, getSearchedMovies } from "./utils/fetch";

export default class App {
  #movieList = [];
  #page = 1;
  #state = "popular";
  #movieName = "";

  constructor() {
    this.init(); //영화 초기 20개 불러오기
    new Header();
    this.initEventHandler();
  }

  async init() {
    await this.getPopularMoviesList();
    this.render();

    document.querySelector("card-list")?.setMovieList(this.#movieList);
  }

  render() {
    const itemView = $(".item-view");
    itemView.innerHTML = `
    <card-list header='${
      this.#state === "popular"
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
      if (this.#state === "popular") this.appendPopularMovieList();
      if (this.#state === "searched") this.appendSearchedMovieList();
    });

    document.addEventListener("search-movie", (event) => {
      this.#state = "searched";
      this.#page = 1;
      this.#movieName = event.detail;
      this.renderSearchedMovies(event.detail);
    });
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

  async appendPopularMovieList() {
    this.#page += 1;
    this.#movieList = [];
    await this.getPopularMoviesList();

    document.querySelector("card-list")?.setMovieList(this.#movieList);
  }

  async appendSearchedMovieList() {
    this.#page += 1;
    this.#movieList = [];
    await this.getSearchedMoviesList();

    document.querySelector("card-list")?.setMovieList(this.#movieList);
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

    document.querySelector("card-list")?.setMovieList(this.#movieList);
  }
}
