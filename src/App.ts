import MovieListContainer from "./components/MovieListContainer";
import MovieListContent from "./components/MovieListContent";
import NavBar from "./components/NavBar";
import { $ } from "./utils/domSelector";

class App {
  private app = $<HTMLDivElement>("#app");
  private main = $<HTMLElement>("main");

  constructor() {
    this.render();
  }

  async render() {
    this.app.insertAdjacentHTML("afterbegin", NavBar.render());
    this.main.insertAdjacentHTML("afterbegin", MovieListContainer.render());
    MovieListContent.loadMovies();
    this.initEvents();
  }

  initEvents() {
    NavBar.onSubmit();
    MovieListContainer.onClick();
  }
}

new App();
