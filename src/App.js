import TitleSearchBar from "./UI/Header/TitleSearchBar/TitleSearchBar";
import Thumbnail from "./UI/Header/Thumbnail/Thumbnail";
import Button from "./UI/MoviesContainer/Button/Button";
import Footer from "./UI/Layout/Footer/Footer";
import { getPopularityMovie } from "./Domain/getPopularityMovie";
import { searchMovie } from "./Domain/searchMovie";
import MovieListSection from "./UI/MoviesContainer/MovieListSection/MovieListSection";
import { IMG_PATH } from "./constants/constants";
import MovieManager from "./Domain/MovieManager";
import UIManager from "./Domain/UIManager";
import MovieItem from "./UI/MoviesContainer/MovieItem/MovieItem";
import Modal from "./UI/Modal/Modal";

class App {
  #movieManager;
  #uiManager;
  #movieListSection;

  constructor() {
    this.#movieManager = new MovieManager();
    this.#uiManager = new UIManager();
    this.#movieListSection = new MovieListSection();
  }

  async init() {
    const app = document.getElementById("app");
    const keyword = this.getKeywordFromURL();
    this.#uiManager.setLoading(true);
    this.render([]);
    const results = keyword
      ? await this.#movieManager.fetchSearch(keyword)
      : await this.#movieManager.fetchPopular();
    this.#uiManager.setLoading(false);

    if (results.results === null) {
      this.render(null);
      return;
    }
    this.#uiManager.setShowMore(true);
    this.render(results.results);
  }

  render(movies) {
    const isLoading = this.#uiManager.getLoading();

    const app = document.getElementById("app");
    app.innerHTML = "";

    const $wrap = document.createElement("div");
    $wrap.id = "wrap";

    const $header = new TitleSearchBar(
      this.onSubmit,
      this.onLogoClick
    ).render();

    const $thumbnail = new Thumbnail(
      !isLoading && movies && movies.length > 0 ? movies[0] : null,
      isLoading
    ).render();
    $wrap.append($thumbnail);

    const $container = document.createElement("div");
    $container.classList.add("container");

    const $main = document.createElement("main");

    const $movieListSection = new MovieListSection(
      this.getKeywordFromURL(),
      movies,
      isLoading,
      this.handleMovieClick
    ).render();

    app.appendChild($wrap);
    $wrap.append($header);
    $wrap.appendChild($container);
    $container.appendChild($main);
    $main.appendChild($movieListSection);

    if (movies && movies.length > 0 && this.#uiManager.getShowMore()) {
      const $moreButton = new Button().render();
      $main.appendChild($moreButton);
      $moreButton.addEventListener("click", this.handleButtonClick);
    }

    const $footer = new Footer().render();
    app.appendChild($footer);

    // if (this.#uiManager.getIsModalOpen() === true) {
    //   const modal = new Modal(movies).render();
    //   document.body.appendChild(modal);
    // }
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
    this.#uiManager.setLoading(true);
    this.#uiManager.setShowMore(true);
    const { results, totalPage } = await this.#movieManager.fetchSearch(
      keyword
    );

    if (totalPage === 1) {
      this.#uiManager.setShowMore(false);
    }
    this.#uiManager.setLoading(false);
    this.render(results);
  };

  onLogoClick = async (e) => {
    e.preventDefault();

    const url = new URL(window.location);
    url.searchParams.delete("query");
    window.history.pushState({}, "", url);

    this.#movieManager.reset();
    this.#uiManager.setShowMore(true);

    const { results } = await this.#movieManager.fetchPopular();

    this.render(results);
  };

  handleButtonClick = async () => {
    const keyword = this.getKeywordFromURL();

    const $main = document.querySelector("main");
    const $ul = document.querySelector(".thumbnail-list");

    const skeletonElements = this.#movieListSection.renderSkeleton($ul);

    const { results, totalPage, currentPage } = keyword
      ? await this.#movieManager.fetchSearch(keyword)
      : await this.#movieManager.fetchPopular();

    if (currentPage >= totalPage) {
      this.#uiManager.setShowMore(false);
      this.#movieListSection.removeMoreButton();
    }

    this.#movieListSection.removeSkeleton(skeletonElements);

    const newMovies = results.slice(-20);
    this.#movieListSection.appendMovies(newMovies, $ul);
  };

  handleMovieClick = async (movieId) => {
    const movieDetail = await this.#movieManager.fetchDetail(movieId);
    const modal = new Modal(movieDetail).render();
    document.body.appendChild(modal);
  };

  getKeywordFromURL() {
    return new URLSearchParams(window.location.search).get("query");
  }
}
export default App;
