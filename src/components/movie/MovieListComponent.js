import CustomComponent from "../../abstracts/CustomComponent";
import MovieListPageComponent from "./MovieListPageComponent";
import MovieComponent from "./MovieComponent";
import ErrorComponent from "./ErrorComponent";
import { STATUS } from "../../abstracts/constants";

export default class MovieListComponent extends CustomComponent {
  #page = null;

  initialRender() {
    this.#page = document.createElement("movie-list-page");
    this.querySelector(".item-list").innerHTML = ``;
    this.querySelector(".item-list").append(this.#page);

    this.#page.setAttribute("data-status", "loading");
  }

  appendRender() {
    if (this.querySelector("error-page")) {
      this.querySelector("error-page").remove();
    }
    this.#page = document.createElement("movie-list-page");
    this.querySelector(".item-list").append(this.#page);

    this.#page.setAttribute("data-status", "loading");
  }

  renderPageSuccess(movieItems) {
    if (!movieItems.length) {
      this.#page.setAttribute("data-status", "no-result");
      return;
    }
    this.#page.setAttribute("data-movie-list", JSON.stringify(movieItems));
    this.#page.setAttribute("data-status", "success");
  }

  renderPageFail() {
    if (this.querySelector("error-page")) return;
    const errorPage = document.createElement("error-page");
    this.#page.replaceWith(errorPage);
  }

  template() {
    return `
            <ul class="item-list">
            </ul>
        `;
  }
}
customElements.define("movie-list", MovieListComponent);
