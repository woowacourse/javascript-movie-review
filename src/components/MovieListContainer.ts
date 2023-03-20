import { $, dispatchCustomEvent } from "./../utils/dom";

class MovieListContainer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.addEvent();
  }

  render(query?: string) {
    const type = this.getAttribute("type");

    this.innerHTML = /* html */ `
      <h2>
        ${type === "popular" ? "지금 인기 있는 영화" : `"${query}" 검색 결과`}
      </h2>
      <movie-list class="item-list hidden"></movie-list>
      ${this.getSkeletonUITemplate()}
      <button id="more-button" class="btn primary full-width">더 보기</button>
    `;
  }

  addEvent() {
    $("button", this)?.addEventListener("click", () => {
      dispatchCustomEvent(this, {
        eventType: "fetchMovieData",
        data: this.getAttribute("type"),
      });
    });
  }

  changeTitle(query?: string) {
    this.setAttribute("type", "search");
    this.render(query);
    this.addEvent();
  }

  removeLoadMovieButton() {
    $("button", this)?.classList.add("hidden");
  }

  displayErrorUI(errorMessage: string) {
    this.innerHTML = `
    <div class="error-container">
      <p>${errorMessage}</p>
      <p>페이지를 새로 고침하거나 네트워크 상태를 확인 후 나중에 다시 시도해주세요.</p>
    </div>
    `;
  }

  getSkeletonUITemplate() {
    return /* html */ `
      <ul class="skeleton-list">
        ${`<li>
          <a href="#">
            <div class="item-card">
              <div class="item-thumbnail skeleton"></div>
              <div class="item-title skeleton"></div>
              <div class="item-score skeleton"></div>
            </div>
          </a>
        </li>`.repeat(20)}
      </ul>
    `;
  }

  hideSkeletonUI() {
    $(".skeleton-list", this)?.classList.add("hidden");
    $("movie-list", this)?.classList.remove("hidden");
  }

  showSkeletonUI() {
    $(".skeleton-list", this)?.classList.remove("hidden");
  }
}

interface MovieListContainer {
  "movie-list-container": typeof MovieListContainer;
}

customElements.define("movie-list-container", MovieListContainer);

export default MovieListContainer;
