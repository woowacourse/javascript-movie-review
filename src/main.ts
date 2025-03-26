import Footer from "./components/Footer";
import Header from "./components/Header";
import PopularMovieBoard from "./components/PopularMovieBoard";
import SearchMovieBoard from "./components/SearchMovieBoard";
import { isHTMLElement } from "./utils/typeGuards";

interface AppContract {
  render: () => void;
}

class App implements AppContract {
  #currentBoard: PopularMovieBoard | SearchMovieBoard | null = null;
  constructor() {}

  public render() {
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
    if (this.#currentBoard) this.#currentBoard.destroy();
    const $section = document.querySelector("main");
    if (isHTMLElement($section))
      this.#currentBoard = new SearchMovieBoard($section, { searchParams });
  }

  #renderPopularMovies() {
    if (this.#currentBoard) this.#currentBoard.destroy();
    const $section = document.querySelector("main");
    if (isHTMLElement($section))
      this.#currentBoard = new PopularMovieBoard($section);
  }

  #renderFooter() {
    const root = document.querySelector("body");
    root?.insertAdjacentHTML("beforeend", Footer());
  }
}

const app = new App();
app.render();
