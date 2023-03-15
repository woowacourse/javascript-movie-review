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

  mounted() {
    const $header = this.$target.querySelector("header");
    const $main = this.$target.querySelector("main");

    new Header($header);
    new MovieList($main, { type: "popular" });
  }
}

export default App;
