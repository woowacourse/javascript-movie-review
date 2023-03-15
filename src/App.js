import Header from "./components/Header";
import MovieList from "./components/MovieList";

class App {
  $target;

  constructor($target) {
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

  renderMovieList(type, searchKeyword) {
    const $main = this.$target.querySelector("main");
    const props = { type, searchKeyword };
    new MovieList($main, props);
  }

  mounted() {
    const $header = this.$target.querySelector("header");

    new Header($header, {
      onSubmitSearchInput: this.renderMovieList.bind(this),
    });
    this.renderMovieList("popular");
  }
}

export default App;
