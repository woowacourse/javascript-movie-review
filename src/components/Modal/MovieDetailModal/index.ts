import "./index.css";

import type { MovieDetail } from "../../../types";

import {
  getStarRateFromStorage,
  setStarRateToStorage,
} from "../../../utils/storage";
import { $ } from "../../../utils/selector";
import { renderStars } from "./StarSelect";
import { getImageContainerTemplate } from "./Image";
import { getDescriptionTemplate } from "./Description";

export class MovieDetailModal {
  #$target;

  constructor($target: Element) {
    this.#$target = $target;

    this.bindEvent();
  }

  bindEvent() {
    $(".modal-content").addEventListener("mouseover", (event: Event) => {
      if (!(event.target instanceof HTMLImageElement)) return;
      if (event.target.className !== "star-rate-select-img") return;

      const movieId = Number(event.target.dataset.movieId);
      const starRate = Number(event.target.dataset.starRate) + 1;

      if (getStarRateFromStorage(movieId) !== starRate) {
        renderStars(movieId, starRate);
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
        ${getImageContainerTemplate(movie.poster_path, movie.title)}
        ${getDescriptionTemplate(movie, starRate)}
    `;
  }
}
