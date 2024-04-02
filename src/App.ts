import Component from "./common/Component";
import Header from "./components/Header";
import MovieList from "./components/MovieList";

export default class App extends Component<HTMLDivElement, {}> {
  protected getTemplate(): string {
    return /*html*/ `
      <header></header>
      <main>
        <section class="item-view">
        </section>
      </main>
      <dialog class="modal">
      </dialog>
    `;
  }

  protected createChild(): void {
    const $header = document.querySelector<HTMLDivElement>("header");
    const $section = document.querySelector<HTMLDivElement>(".item-view");

    if ($section) {
      const movieList = new MovieList($section);
      $header &&
        new Header($header, {
          onLogoClick: movieList.handleResetMovieList.bind(movieList),
          onSearchKeywordSubmit: movieList.handleSearchMovie.bind(movieList),
        });
    }
  }
}
