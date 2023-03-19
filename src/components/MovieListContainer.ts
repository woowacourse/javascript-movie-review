import { dispatchCustomEvent } from "./../utils/dom";
import { $ } from "../utils/dom";
import { ErrorUnresponsive } from "../../images";

class MovieListContainer extends HTMLElement {
  constructor() {
    super();
  }

  render(query?: string) {
    const contentType = this.getAttribute("contenttype");

    this.innerHTML = /* html */ `
        <h2>${
          contentType === "popular"
            ? "지금 인기 있는 영화"
            : `"${query}" 검색 결과`
        }</h2>
        <movie-list class="item-list"></movie-list>
        <button id="more-button" class="btn primary full-width">더 보기</button>
      `;
    this.addEvent();
  }

  addEvent() {
    $("button", this)?.addEventListener("click", () => {
      dispatchCustomEvent(this, {
        eventType: "fetchMovieData",
        data: this.getAttribute("contentType"),
      });
    });
  }

  changeTitle(query: string) {
    this.setAttribute("contentType", "search");
    this.render(query);
  }

  hiddenLoadMovieButton() {
    $("button", this)?.classList.add("hidden");
  }

  displayErrorUI(message: string) {
    this.innerHTML = `
    <div class="error-image-container">
      <p class="error-message">${message}</p>
    </div>
    `;
  }
}

interface MovieListContainer {
  "movie-list-container": typeof MovieListContainer;
}

customElements.define("movie-list-container", MovieListContainer);

export default MovieListContainer;
