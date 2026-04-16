import { ERROR_MESSAGE } from "../constants/error";

import emptyStar from "../asset/images/star_empty.png";
import emptyIcon from "../asset/images/empty_icon.png";
import noImage from "../asset/images/no-image.png";

export class MovieListView {
  #titleSection;
  #listSection;
  #handle;

  constructor(handle: (id: string) => void) {
    this.#listSection = document.querySelector(".thumbnail-list");
    this.#titleSection = document.querySelector("#thumbnail-title");
    this.#handle = handle;
    this.#binding();
  }

  setTitle(title: string) {
    if (!this.#titleSection) return;
    this.#titleSection.textContent = title;
  }

  render(movieList: Movies[]) {
    const thumbnailImage = "https://media.themoviedb.org/t/p/w200";

    movieList?.forEach((item) => {
      const list = /*html*/ `
      <li id=${item.id} class="thumbnail-item">
        <div class="item">
          <img
            class="thumbnail"
            src=${thumbnailImage + item.poster_path}
            alt=${item.title}
            onerror="this.onerror=null; this.src='${noImage}'"
        />
          <div class="item-desc">
            <p class="rate">
              <img
                src="${emptyStar}"
                class="star"
              /><span class="item-rate">${item.vote_average.toFixed(1)}</span>
            </p>
            <strong class="item-title">${item.title}</strong>
          </div>
        </div>
        </li>
    `;

      if (!this.#listSection) return;
      this.#listSection.insertAdjacentHTML("beforeend", list);
    });
  }

  #binding() {
    if (!this.#listSection) return;

    this.#listSection.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const item = target.closest("li");
      if (!item?.id) return;

      this.#handle(item.id);
    });
  }

  emptyRender() {
    this.reset();
    const emptyList = /*html*/ `
        <li class="thumbnail-empty">
            <img src="${emptyIcon}" alt="empty list" class="empty-icon" />
            <p class="empty-message">${ERROR_MESSAGE.EMPTY}</p>
        </li>
    `;

    if (!this.#listSection) return;
    this.#listSection.innerHTML = emptyList;
  }

  errorRender(message: string) {
    this.reset();
    const emptyList = /*html*/ `
        <li class="thumbnail-empty">
            <img src="${emptyIcon}" alt="empty list" class="empty-icon" />
            <p class="empty-message">${message}</p>
        </li>
    `;

    if (!this.#listSection) return;
    this.#listSection.innerHTML = emptyList;
  }

  skeletonRender(count: number = 20): void {
    const skeletonList = Array.from({ length: count }, () => {
      return /*html*/ `
      <li class="skeleton-card" aria-hidden="true">
        <div class="item">
          <div class="thumbnail skeleton-box"></div>
          <div class="item-desc">
            <p class="rate">
              <span class="skeleton-star skeleton-box"></span>
              <span class="skeleton-score skeleton-box"></span>
            </p>
            <strong class="skeleton-title skeleton-box"></strong>
          </div>
        </div>
      </li>
    `;
    }).join("");

    if (!this.#listSection) return;

    this.#listSection.insertAdjacentHTML("beforeend", skeletonList);
  }

  skeletonRemover() {
    if (!this.#listSection) return;
    const skeletonList = this.#listSection.querySelectorAll(".skeleton-card");

    skeletonList.forEach((element) => element.remove());
  }

  reset() {
    if (!this.#listSection) return;

    this.#listSection.innerHTML = "";
  }
}
