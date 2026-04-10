import template from "../templates/index.html?raw";
import "../public/styles/index.css";
import { renderMovies } from "./movieRenderer.ts";
import AppState from "./AppState.ts";
import SearchHandler from "./SearchHandler.ts";
import ModalHandler from "./ModalHandler.ts";
import { createScrollObserver } from "./utils/scrollObserver.ts";

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
    const search = new SearchHandler(this.state);
    const modal = new ModalHandler();

    document.addEventListener("click", search.handleSearchButtonClick);
    document.addEventListener("keydown", search.handleSearchKeydown);

    document.addEventListener("click", modal.handleMovieClick);
    document.addEventListener("click", modal.handleModalCloseButtonClick);
    document.addEventListener("click", modal.handleModalCloseBackdrop);
    document.addEventListener("keydown", modal.handleModalCloseButtonKeyDown);

    // 더보기 흐름 이벤트 부착
    const sentinel = document.querySelector<HTMLElement>("#scroll-sentinel");
    if (sentinel) {
      let cleanup: () => void;
      cleanup = createScrollObserver(sentinel, async () => {
        const isLastPage = await search.handleLoadMoreScroll();
        if (isLastPage) cleanup();
      });
    }
  }
}

new App();
