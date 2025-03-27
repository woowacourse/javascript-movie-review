import Footer from "./components/Footer";
import Header from "./components/Header";
import PopularMovieBoard from "./components/MovieBoards/PopularMovieBoard";
import SearchMovieBoard from "./components/MovieBoards/SearchMovieBoard";
import { isHTMLElement } from "./utils/typeGuards";

interface AppContract {
  render: () => void;
}

class App implements AppContract {
  constructor() {
    this.#renderInitialLayout();
  }

  public render() {
    this.#renderHeader();
    this.#renderPopularMovies();
  }

  #renderInitialLayout(): void {
    const $body = document.querySelector("body");
    if (!isHTMLElement($body)) return;
    $body.innerHTML = /*html*/ `
      <header></header>
      <main></main>
      ${Footer()}
    `;
  }

  #renderHeader() {
    const $header = document.querySelector("header");
    if (!isHTMLElement($header)) return;
    new Header($header, {
      onSearchSubmitted: (params: string) => this.#renderSearchResult(params),
      onLogoClicked: () => this.#renderPopularMovies(),
    });
  }

  #renderSearchResult(searchParams: string) {
    const $section = document.querySelector("main");
    window.scrollTo(0, 0);

    if (!isHTMLElement($section)) return;
    new SearchMovieBoard($section, { searchParams });
  }

  #renderPopularMovies() {
    const $section = document.querySelector("main");
    if (isHTMLElement($section)) new PopularMovieBoard($section);
  }
}

const app = new App();
app.render();
