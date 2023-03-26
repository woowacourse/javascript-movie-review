import Header from "./components/Header/Header";
import MovieList from "./components/MovieList/MovieList";
import Modal from "./components/Modal/Modal";

class App {
  $target: HTMLDivElement;
  #modal: Modal;

  constructor($target: HTMLDivElement) {
    this.$target = $target;
    this.#modal = new Modal(this.$target);

    this.render();
  }

  template() {
    return `
      <header></header>
      <main></main>
      <div id="notification"></div>
    `;
  }

  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }

  renderMovieList(type: string, searchKeyword?: string) {
    const $main = this.$target.querySelector("main");
    const props = { type, searchKeyword: searchKeyword || "", modal: this.#modal };

    if ($main) {
      new MovieList($main, props);
    }
  }

  mounted() {
    const $header = this.$target.querySelector("header");

    if ($header) {
      new Header($header, {
        renderMovieList: this.renderMovieList.bind(this),
      });
      this.renderMovieList("popular");
    }

    new Modal(this.$target);
  }
}

export default App;
