import Footer from "./components/Footer";
import Header from "./components/Header";
import PopularMovieBoard from "./components/PopularMovieBoard";
import SearchMovieBoard from "./components/SearchMovieBoard";
import { isHTMLElement } from "./utils/typeGuards";

class App {
  constructor() {
    this.#initialSetup();
  }

  #renderSearchResult(searchParams: string) {
    const $section = document.querySelector("main");
    if (isHTMLElement($section))
      new SearchMovieBoard($section, { searchParams });
  }

  async #initialSetup() {
    const $header = document.querySelector("header");
    if (isHTMLElement($header))
      new Header($header, {
        search: (params: string) => this.#renderSearchResult(params),
      });

    const $section = document.querySelector("main");
    if (isHTMLElement($section)) new PopularMovieBoard($section);

    this.#renderFooter();
  }

  #renderFooter() {
    const root = document.querySelector("body");
    root?.insertAdjacentHTML("beforeend", Footer());
  }
}

new App();
