import { movieListTemplate } from "./templates/movieListsTemplates";

class MovieListView {
  #thumbnailList = document.querySelector<HTMLElement>(".thumbnail-list");
  #thumbnailContainer = document.querySelector<HTMLDivElement>(".thumbnail-container");
  #errorThumbnailContainer = document.querySelector<HTMLDivElement>(".error-thumbnail-container");
  #thumbnailRetryButton = document.querySelector<HTMLButtonElement>(".thumbnail-retry-button");
  #emptyMessageContainer = document.querySelector<HTMLElement>(".empty-message-container");

  constructor() {
    this.#thumbnailList?.addEventListener('error', (event) => {
      const target = event.target;

      if (target instanceof HTMLImageElement) {
        target.src = './images/no-image.png';
      }
    }, true);
  };

  renderSkeletonList(count: number) {
    if (!this.#thumbnailList) return;

    const skeletonList = Array.from({ length: count }, () => {
    return movieListTemplate.skeletonList
  }).join("");

  this.#thumbnailList.insertAdjacentHTML("beforeend", skeletonList);
  };

  removeSkeletonList() {
    const skeletonList = document.querySelectorAll(".skeleton-card");
    skeletonList.forEach((element) => element.remove());
  };

  #showListMode(mode: 'list' | 'error' | 'empty') {
    this.#thumbnailContainer?.classList.toggle("hidden", mode !== 'list');
    this.#errorThumbnailContainer?.classList.toggle("hidden", mode !== 'error');
    this.#emptyMessageContainer?.classList.toggle("hidden", mode !== 'empty');
  }; 

  renderMovieList(movies: Movies[]) {
    this.#showListMode('list');
    
    if (!this.#thumbnailList) return;

    const movieListHTML = movies
      .map((item) => movieListTemplate.movieList(item))
      .join("");
    this.#thumbnailList.insertAdjacentHTML("beforeend", movieListHTML);
  };

  resetMovieList() {
    if (this.#thumbnailList) this.#thumbnailList.textContent = "";
  };

  renderErrorList() {
    this.#showListMode('error');
  };

  bindThumbnailRetryClick(handler: () => void) {
    this.#thumbnailRetryButton?.addEventListener("click", () => {
      handler();
    });
  };

  renderEmptyList() {
    this.#showListMode('empty');
  };
}

export const movieListView = new MovieListView();
