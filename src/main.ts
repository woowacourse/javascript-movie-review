import Footer from "./components/Footer";
import Header from "./components/Header";
import PopularMovieBoard from "./components/PopularMovieBoard";
import SearchMovieBoard from "./components/SearchMovieBoard";
import { isHTMLElement } from "./utils/typeGuards";

class App {
  constructor() {
    this.#initialSetup();
  }

  #initialSetup() {
    this.#renderHeader();
    this.#renderPopularMovies();
    this.#renderFooter();
  }

  #renderHeader() {
    const $header = document.querySelector("header");
    if (isHTMLElement($header))
      new Header($header, {
        onSearchSubmitted: (params: string) => this.#renderSearchResult(params),
        onLogoClicked: () => this.#renderPopularMovies(),
      });
  }

  #renderSearchResult(searchParams: string) {
    const $section = document.querySelector("main");
    if (isHTMLElement($section))
      new SearchMovieBoard($section, { searchParams });
  }

  #renderPopularMovies() {
    const $section = document.querySelector("main");
    if (isHTMLElement($section)) new PopularMovieBoard($section);
  }

  #renderFooter() {
    const root = document.querySelector("body");
    root?.insertAdjacentHTML("beforeend", Footer());
  }
}

new App();
