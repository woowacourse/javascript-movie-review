import CustomComponent from "../../abstracts/CustomComponent";
import MovieListPageComponent from "./MovieListPageComponent";
import MovieComponent from "./MovieComponent";
import ErrorComponent from "./ErrorComponent";
import { STATUS } from "../../constants/constants";

export default class MovieListComponent extends CustomComponent {
  #page;

  initialPage() {
    this.#page = document.createElement("movie-list-page");
    this.innerHTML = ``;
    this.append(this.#page);

    this.#page.setAttribute("data-status", STATUS.LOADING);
  }

  appendNewPage() {
    const errorPage = this.querySelector("error-page");
    if (errorPage) {
      errorPage.remove();
    }
    this.#page = document.createElement("movie-list-page");
    this.append(this.#page);

    this.#page.setAttribute("data-status", STATUS.LOADING);
  }

  renderPageSuccess(movieItems) {
    if (!movieItems.length) {
      this.#page.setAttribute("data-status", "no-result");
      return;
    }
    this.#page.setAttribute("data-movie-list", JSON.stringify(movieItems));
    this.#page.setAttribute("data-status", STATUS.SUCCESS);
  }

  renderPageFail() {
    if (this.querySelector("error-page")) return;

    const errorPage = document.createElement("error-page");
    this.#page.replaceWith(errorPage);
  }
}

customElements.define("movie-list", MovieListComponent);
