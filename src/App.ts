import NavBar from "./components/NavBar";
import { $ } from "./utils/domSelector";
import MovieList from "./domain/MovieList";
import MovieListContainer from "./components/MovieListContainer";

class App {
  private app = $<HTMLDivElement>("#app");
  private main = $<HTMLElement>("main");

  constructor() {
    this.render();
    // this.initEvents();
  }

  async render() {
    this.app.insertAdjacentHTML("afterbegin", NavBar.render());
    this.main.insertAdjacentHTML(
      "beforeend",
      MovieListContainer.renderSkeleton(false)
    );
    const movies = await MovieList.fetchMovieData();
    this.main.replaceChildren();
    this.main.insertAdjacentHTML(
      "beforeend",
      MovieListContainer.render(false, movies)
    );
    this.initEvents();
  }

  initEvents() {
    MovieListContainer.onClick();
  }
}

new App();
