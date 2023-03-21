import Header from "./components/Header/Header";
import MovieList from "./components/MovieList/MovieList";

class App {
  $target: HTMLDivElement;

  constructor($target: HTMLDivElement) {
    this.$target = $target;

    this.render();
  }

  template() {
    return `
      <header></header>
      <main></main>
    `;
  }

  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }

  renderMovieList(type: string, searchKeyword?: string) {
    const $main = this.$target.querySelector("main");
    const props = { type, searchKeyword: searchKeyword || "" };

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
  }
}

export default App;
