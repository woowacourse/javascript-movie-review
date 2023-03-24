import MovieListContainer from "./components/MovieListContainer";
import NavBar from "./components/NavBar";
import { $ } from "./utils/domSelector";

class App {
  constructor() {
    this.render();
    this.initEvents();
  }

  async render() {
    $<HTMLDivElement>("#app").insertAdjacentHTML("afterbegin", NavBar.render());
    $<HTMLElement>("main").insertAdjacentHTML(
      "afterbegin",
      MovieListContainer.render()
    );
  }

  initEvents() {
    NavBar.bindSubmitEvent();
    MovieListContainer.setScrollObserver();
  }
}

new App();
