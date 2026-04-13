import template from "../templates/index.html?raw";
import "../public/styles/index.css";
import { renderMovies } from "./movieRenderer.ts";
import AppState from "./AppState.ts";
import MovieBrowseHandler from "./MovieBrowseHandler.ts";
import ModalHandler from "./ModalHandler.ts";

class App {
  private state = new AppState();

  constructor() {
    const base = import.meta.env.BASE_URL;
    document.querySelector("#app")!.innerHTML = template.replace(
      /\/images\//g,
      `${base}images/`,
    );
    renderMovies(this.state.moviePageCount);
    this.addEventListeners();
  }

  addEventListeners() {
    new MovieBrowseHandler(this.state).init();
    new ModalHandler().init();
  }
}

new App();
