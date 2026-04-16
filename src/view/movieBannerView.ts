const BANNER_IMAGE_URL =
  "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces";

import emptyStar from "../asset/images/star_empty.png";

export class MovieBannerView {
  #section;
  #headerBar;
  #handle;

  constructor(handle: (id: string) => void) {
    this.#section = document.querySelector<HTMLElement>(
      ".background-container",
    );
    this.#headerBar = document.querySelector<HTMLElement>("#header-bar");
    this.#handle = handle;
    this.#logoBinding();
  }

  render(bannerMovie: Movies) {
    if (!this.#section) return;

    this.#section.style.backgroundImage = `url(${BANNER_IMAGE_URL + bannerMovie.poster_path})`;
    this.#section.innerHTML = /*html*/ `
      <div class="overlay" aria-hidden="true"></div>
      <div class="top-rated-container">
        <div class="top-rated-movie">
          <div class="rate">
            <img src="${emptyStar}" class="star" />
            <span class="rate-value">${bannerMovie.vote_average}</span>
          </div>
          <div class="title">${bannerMovie.title}</div>
          <button class="primary detail">자세히 보기</button>
        </div>
      </div>
    `;

    this.#binding(bannerMovie.id);
  }

  #binding(id: number) {
    const detailButton = this.#section?.querySelector(".detail");
    if (!detailButton) return;
    detailButton.addEventListener("click", () => {
      this.#handle(id.toString());
    });
  }

  #logoBinding() {
    if (!this.#headerBar) return;
    const logo = this.#headerBar.querySelector(".logo");
    logo?.addEventListener("click", () => {
      window.location.reload();
    });
  }

  hide() {
    if (!this.#section || !this.#headerBar) return;

    this.#section.style.display = "none";
    this.#headerBar.style.position = "relative";
  }
}
