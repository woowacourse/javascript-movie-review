import NavBar from "./components/NavBar";
import { $ } from "./utils/domSelector";
import MovieListContainer from "./components/MovieListContainer";

class App {
  private app = $<HTMLDivElement>("#app");

  constructor() {
    this.render();
  }

  async render() {
    this.app.insertAdjacentHTML("afterbegin", NavBar.render());
    MovieListContainer.loadMovies();
    this.initEvents();
  }

  initEvents() {
    NavBar.onSubmit();
  }
}

new App();
