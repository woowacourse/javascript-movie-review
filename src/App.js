import Header from "./components/Header";
import MovieView from "./components/MovieView";

class App {
  $main = document.createElement("main");

  constructor($target) {
    this.init($target);

    this.render($target);
  }

  init($target) {
    this.header = new Header($target);
    this.movieView = new MovieView(this.$main);
  }

  render($target) {
    // $target === $app
    $target.insertAdjacentElement("beforeend", this.$main);
  }
}

export default App;
