import TitleSearchBar from "./UI/Header/TitleSearchBar/TitleSearchBar";
import Thumbnail from "./UI/Header/Thumbnail/Thumbnail";
import Button from "./UI/MoviesContainer/Button/Button";
import Footer from "./UI/Layout/Footer/Footer";
import { getPopularityMovie } from "./Domain/getPopularityMovie";
import { searchMovie } from "./Domain/searchMovie";
import MovieListSection from "./UI/MoviesContainer/MovieListSection/MovieListSection";
import { IMG_PATH } from "./constants/constants";
import MovieManager from "./Domain/MovieManager";

class App {
  #movieManager;
  #isLoading;
  #show;

  constructor() {
    this.#movieManager = new MovieManager();
    this.#isLoading = true;
    this.#show = true;
  }

  async init() {
    const app = document.getElementById("app");
    app.innerHTML = "로딩 중";

    const keyword = this.getKeywordFromURL();
    const results = keyword
      ? await this.#movieManager.fetchSearch(keyword)
      : await this.#movieManager.fetchPopular();

    if (results.results === null) {
      this.render(null);
      return;
    }
    this.#isLoading = false;
    this.render(results.results);
  }

  render(movies) {
    const app = document.getElementById("app");
    app.innerHTML = "";

    const $wrap = document.createElement("div");
    $wrap.id = "wrap";

    const $header = new TitleSearchBar(this.onSubmit).render();

    if (movies && movies.length > 0) {
      const $thumbnail = new Thumbnail(movies[0]).render();
      $wrap.append($thumbnail);
    }

    const $container = document.createElement("div");
    $container.classList.add("container");

    const $main = document.createElement("main");

    const $movieListSection = new MovieListSection(
      this.getKeywordFromURL(),
      movies,
      this.#isLoading
    ).render();

    app.appendChild($wrap);
    $wrap.append($header);
    $wrap.appendChild($container);
    $container.appendChild($main);
    $main.appendChild($movieListSection);

    if (movies && movies.length > 0 && this.#show) {
      const $moreButton = new Button().render();
      $main.appendChild($moreButton);
      $moreButton.addEventListener("click", this.handleButtonClick);
    }

    const $footer = new Footer().render();
    app.appendChild($footer);
  }

  onSubmit = async (e) => {
    e.preventDefault();

    const $input = document.querySelector(".search-input");
    const keyword = $input.value;
    if (!keyword) return;

    const newUrl = new URL(window.location);
    newUrl.searchParams.set("query", keyword);
    window.history.pushState({}, "", newUrl);

    this.#movieManager.reset();
    this.#isLoading = true;
    this.#show = true;
    const { results, totalPage } = await this.#movieManager.fetchSearch(
      keyword
    );

    if (totalPage === 1) this.#show = false;
    this.#isLoading = false;
    this.render(results);
  };

  handleButtonClick = async () => {
    const keyword = this.getKeywordFromURL();
    const { results, totalPage, currentPage } = keyword
      ? await this.#movieManager.fetchSearch(keyword)
      : await this.#movieManager.fetchPopular();

    if (currentPage >= totalPage) this.#show = false;
    this.render(results);
  };

  getKeywordFromURL() {
    return new URLSearchParams(window.location.search).get("query");
  }
}
export default App;
