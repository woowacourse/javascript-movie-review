import "./index.css";

import { MovieDetail } from "../../../types";

import {
  getStarRateFromStorage,
  setStarRateToStorage,
} from "../../../utils/storage";
import { $ } from "../../../utils/selector";
import { StarSelect } from "./StarSelect";
import { Image } from "./Image";
import { Description } from "./Description";

export class MovieDetailModal {
  #$target;

  #$StarSelectContainer;
  #$ImageContainer;
  #$Description;

  constructor($target: Element) {
    this.#$target = $target;
    this.#$StarSelectContainer = new StarSelect();
    this.#$ImageContainer = new Image();
    this.#$Description = new Description();

    this.bindEvent();
  }

  bindEvent() {
    $(".modal-content").addEventListener("mouseover", (event: Event) => {
      if (!(event.target instanceof HTMLImageElement)) return;
      if (event.target.className !== "star-rate-select-img") return;

      const movieId = Number(event.target.dataset.movieId);
      const starRate = Number(event.target.dataset.starRate) + 1;

      if (getStarRateFromStorage(movieId) !== starRate) {
        this.#$StarSelectContainer.renderStars(movieId, starRate);
        setStarRateToStorage(movieId, starRate);
      }
    });
  }

  render(movie: MovieDetail, movieId: number) {
    const header = $(".modal-header--text");

    if (header instanceof HTMLElement) header.textContent = movie.title;

    this.#$target.innerHTML = this.getMovieDetailTemplate(
      movie,
      getStarRateFromStorage(movieId)
    );
  }

  getMovieDetailTemplate(movie: MovieDetail, starRate: number) {
    return /*html */ `
        ${this.#$ImageContainer.getImageContainerTemplate(
          movie.poster_path,
          movie.title
        )}
        ${this.#$Description.getDescriptionTemplate(movie, starRate)}
    `;
  }
}
