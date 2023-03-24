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
      `;
    this.addEvent();
  }

  addEvent() {
    let isThrottled = false;

    window.addEventListener("scroll", () => {
      const windowHeight = window.innerHeight;
      const fullHeight = document.body.scrollHeight;
      const currentPosition = window.pageYOffset;

      if (!isThrottled && currentPosition + windowHeight >= fullHeight) {
        this.stopScrolling();

        dispatchCustomEvent(this, {
          eventType: "fetchMovieData",
          data: this.contentTypeAttribute,
        });

        isThrottled = true;

        setTimeout(() => {
          isThrottled = false;
        }, 2000);
      }
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

  stopScrolling() {
    window.removeEventListener("scroll", this.addEvent);
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
