import { dispatchCustomEvent } from "./../utils/dom";
import { $ } from "../utils/dom";
import { ErrorUnresponsive } from "../../images";

class MovieListContainer extends HTMLElement {
  constructor() {
    super();
  }

  render(query?: string) {
    const contentType = this.getAttribute("content-type");

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

  removeLoadMovieButton() {
    $("button", this)?.classList.add("hidden");
  }

  displayErrorUI() {
    this.innerHTML = `
    <div class="error-image-container">
     <img class="error-image" src=${ErrorUnresponsive} alt="서버 무응답"/>
    </div>
    `;
  }
}

interface MovieListContainer {
  "movie-list-container": typeof MovieListContainer;
}

customElements.define("movie-list-container", MovieListContainer);

export default MovieListContainer;
