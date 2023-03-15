import Header from "./components/MovieHeader";
import { $ } from "./utils/Dom";
import { getPopularMovies } from "./utils/fetch";

export default class App {
  #movieList = [];
  #page = 1;

  constructor() {
    this.init(); //영화 초기 20개 불러오기
    new Header();
    this.initEventHandler();
  }

  async init() {
    this.#movieList = [];
    this.#page = 1;
    this.appendMovieList();
  }

  render() {
    const ItemList = $(".item-list");
    this.#movieList.forEach((item) => {
      ItemList.insertAdjacentHTML(
        "beforeend",
        `<movie-card title='${item.title}' poster='${item.poster}' rating='${item.rating}'></movie-card>`
      );
    });
  }

  setEvent() {
    const moreButton = $("#more-button");
    moreButton.addEventListener("click", () => {});
  }

  async initEventHandler() {
    document.addEventListener("more-button-clicked", async () => {
      this.appendMovieList();
    });

    document.addEventListener("search-movie", () => {});
  }

  async appendMovieList() {
    const fetchedData = await getPopularMovies(this.#page);
    const result = fetchedData.results;
    result.forEach((item) => {
      this.#movieList.push({
        title: item.title,
        poster: item.poster_path,
        rating: item.vote_average,
      });
    });
    this.#page += 1;
    const ItemList = $(".item-list");
    ItemList.innerHTML = "";

    this.render();
  }
}
