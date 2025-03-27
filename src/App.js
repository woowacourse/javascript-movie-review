import TitleSearchBar from "./UI/Header/TitleSearchBar/TitleSearchBar";
import Thumbnail from "./UI/Header/Thumbnail/Thumbnail";
import Button from "./UI/MoviesContainer/Button/Button";
import Footer from "./UI/Layout/Footer/Footer";
import { getPopularityMovie } from "./Domain/getPopularityMovie";
import { searchMovie } from "./Domain/searchMovie";
import MovieListSection from "./UI/MoviesContainer/MovieListSection/MovieListSection";
import MoviesCotainer from "./UI/MoviesContainer/MoviesCotainer/MoviesCotainer";

class App {
  #searchKeyword;
  #mode;

  constructor() {
    this.#mode = "popular";
    this.#searchKeyword = "";
  }

  setSearchKeyword = async (searchKeyword) => {
    this.#searchKeyword = searchKeyword;
    await this.render();
  };

  setMode = async (mode) => {
    this.#mode = mode;
    await this.render();
  };

  async render() {
    const body = document.querySelector("body");
    body.innerHTML = "";

    const $wrap = document.createElement("div");
    $wrap.id = "wrap";

    new TitleSearchBar(this.onSubmit, $wrap).render();

    const $container = document.createElement("div");
    const moviesContainer = new MoviesCotainer(
      this.#searchKeyword,
      this.#mode,
      $container
    );
    await moviesContainer.init();

    body.appendChild($wrap);
    $wrap.appendChild($container);

    new Footer(body).render();

    document.addEventListener("keydown", (e) => {
      const $modalBg = document.querySelector("#modalBackground");

      if ($modalBg.classList.contains("active") && e.key === "Escape") {
        $modalBg.classList.remove("active");
      }
    });
  }

  onSubmit = async (e) => {
    e.preventDefault();

    const $input = document.querySelector(".search-input");

    if ($input.value === "") return;

    await this.setSearchKeyword($input.value);
    await this.setMode("search");
  };
}

export default App;
