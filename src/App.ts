import NavBar from "./components/NavBar";
import { $ } from "./utils/domSelector";
import MovieListContainer from "./components/MovieListContainer";

class App {
  private app = $<HTMLDivElement>("#app");
  private main = $<HTMLElement>("main");

  constructor() {
    this.render();
  }

  async render() {
    this.app.insertAdjacentHTML("afterbegin", NavBar.render());
    this.main.insertAdjacentHTML("afterbegin", MovieListContainer.render());
    MovieListContainer.loadMovies();
    this.initEvents();
  }

  initEvents() {
    NavBar.onSubmit();
    MovieListContainer.onClick();
  }
}

new App();
