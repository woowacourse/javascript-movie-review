import { dispatchCustomEvent } from "./../utils/dom";
import { $ } from "../utils/dom";

class MovieListContainer extends HTMLElement {
  constructor() {
    super();
  }

  get contentTypeAttribute() {
    return this.getAttribute("content-type");
  }

  render(query?: string) {
    const contentType = this.contentTypeAttribute;
    const title =
      contentType === "popular"
        ? "지금 인기 있는 영화"
        : `"${query}" 검색 결과`;

    this.innerHTML = /* html */ `
        <h2>${title}</h2>
        <movie-list class="item-list"></movie-list>
        <button id="more-button" class="btn primary full-width">더 보기</button>
      `;
    this.addEvent();
  }

  addEvent() {
    $("button", this)?.addEventListener("click", () => {
      dispatchCustomEvent(this, {
        eventType: "fetchMovieData",
        data: this.contentTypeAttribute,
      });
    });

    $("movie-list")?.addEventListener("click", (event) => {
      event.preventDefault();

      const target = <HTMLElement>event.target;
      const id = target.closest<HTMLElement>("movie-item")?.id;

      if (id) {
        dispatchCustomEvent(this, {
          eventType: "openMovieDetail",
          data: id,
        });
      }
    });
  }

  changeTitle(query: string) {
    this.setAttribute("content-type", "search");
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
