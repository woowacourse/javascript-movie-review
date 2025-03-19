import Footer from "./components/Footer";
import Header from "./components/Header";
import MovieBoard from "./components/MovieBoard";
import { isHTMLElement } from "./utils/typeGuards";

export interface Movie {
  id: number;
  poster_path: string;
  vote_average: number;
  title: string;
}

class App {
  constructor() {
    this.#initialSetup();
  }

  async #initialSetup() {
    const $header = document.querySelector("header");
    if (isHTMLElement($header)) new Header($header);

    const $section = document.querySelector("main");
    if (isHTMLElement($section)) new MovieBoard($section, { type: "POPULAR" });

    this.#renderFooter();
  }

  #renderFooter() {
    const root = document.querySelector("body");
    root?.insertAdjacentHTML("beforeend", Footer());
  }
}

new App();
