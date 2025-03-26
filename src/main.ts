import Footer from "./components/Footer";
import Header from "./components/Header";
import Modal from "./components/Modal";
import PopularMovieBoard from "./components/PopularMovieBoard";
import SearchMovieBoard from "./components/SearchMovieBoard";
import { isHTMLElement } from "./utils/typeGuards";

interface AppContract {
  render: () => void;
}

class App implements AppContract {
  constructor() {}

  public render() {
    this.#renderHeader();
    this.#renderPopularMovies();
    this.#renderFooter();
    this.#renderModal();
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

  #renderModal() {
    const $modalBackground = document.querySelector(".modal-background");
    if (isHTMLElement($modalBackground)) new Modal($modalBackground);
  }
}

const app = new App();
app.render();
