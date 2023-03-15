import { dispatchCustomEvent } from "./../utils/dom";
import { $ } from "../utils/dom";

class MovieListContainer extends HTMLElement {
  constructor() {
    super();
  }

  render(query?: string) {
    const type = this.getAttribute("type");

    this.innerHTML = /* html */ `
        <h2>${
          type === "popular" ? "지금 인기 있는 영화" : `"${query}" 검색 결과`
        }</h2>
        <movie-list class="item-list"></movie-list>
        <button class="btn primary full-width">더 보기</button>
      `;
    this.addEvent();
  }

  addEvent() {
    $("button", this)?.addEventListener("click", () => {
      dispatchCustomEvent(this, {
        eventType: "fetchMovieData",
        data: this.getAttribute("type"),
      });
    });
  }

  changeTitle(query: string) {
    this.setAttribute("type", "search");
    this.render(query);
  }
}

interface MovieListContainer {
  "movie-list-container": typeof MovieListContainer;
}

customElements.define("movie-list-container", MovieListContainer);

export default MovieListContainer;
