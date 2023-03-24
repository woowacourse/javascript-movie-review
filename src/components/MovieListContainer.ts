import { dispatchCustomEvent } from "./../utils/dom";
import { $ } from "../utils/dom";
import { Word } from "../utils/constants";

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
        ? `${Word.TITLE_POPULAR}`
        : `"${query}" ${Word.TITLE_SEARCH}`;

    this.innerHTML = /* html */ `
        <h2>${title}</h2>
        <movie-list class="item-list"></movie-list>
        <div class="list-bottom"></div>
      `;
    this.addEvent();
  }

  addEvent() {
    this.scrollingEvent();

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

  scrollingEvent() {
    const observer = new IntersectionObserver((entries) => {
      const $listBottom = entries[0];
      if ($listBottom.isIntersecting) {
        dispatchCustomEvent(this, {
          eventType: "fetchMovieData",
          data: this.contentTypeAttribute,
        });
      }
    });

    const $listBottom = $(".list-bottom");
    if ($listBottom) observer.observe($listBottom);
  }

  hiddenListBottom() {
    $(".list-bottom")?.classList.add("hidden");
  }

  changeTitle(query: string) {
    this.setAttribute("content-type", "search");
    this.render(query);
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
