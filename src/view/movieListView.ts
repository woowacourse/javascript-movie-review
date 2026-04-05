import { movieListTemplate } from "./templates/movieListsTemplates";

class MovieListView {
  #thumbnailList = document.querySelector<HTMLElement>(".thumbnail-list");

  constructor() {
    this.#thumbnailList?.addEventListener('error', (event) => {
      const target = event.target;

      if (target instanceof HTMLImageElement) {
        target.src = './images/no-image.png';
      }
    }, true);
  }

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

  renderMovieList(movies: Movies[]) {
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
    const errorList = movieListTemplate.errorList;
    if (this.#thumbnailList) this.#thumbnailList.innerHTML = errorList;
  };

  renderEmptyList() {
    const emptyList = movieListTemplate.emptyList;
    if (this.#thumbnailList) this.#thumbnailList.innerHTML = emptyList;
  };
}

export const movieListView = new MovieListView();
