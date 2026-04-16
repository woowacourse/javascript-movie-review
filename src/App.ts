import template from "../templates/index.html?raw";
import "../public/styles/index.css";
import AppState from "./AppState.ts";
import MovieBrowseHandler from "./MovieBrowseHandler.ts";
import ModalHandler from "./ModalHandler.ts";
import { LocalRatingStorage } from "./storage/LocalRatingStorage.ts";

class App {
  private state = new AppState();

  constructor() {
    const base = import.meta.env.BASE_URL;
    document.querySelector("#app")!.innerHTML = template.replace(
      /\/images\//g,
      `${base}images/`,
    );
    this.init();
  }

  private async init() {
    await new MovieBrowseHandler(this.state).init();
    new ModalHandler(new LocalRatingStorage()).init();
  }
}

new App();
