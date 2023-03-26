import "./index.css";

import { MovieDetail } from "../../../types";

import filledStarImg from "../../../../templates/star_filled.png";

import {
  getStarRateFromStorage,
  setStarRateToStorage,
} from "../../../utils/storage";
import { $ } from "../../../utils/selector";
import { StarSelectContainer } from "./StarSelectContainer";

export class MovieDetailModal {
  #$target;
  #$StarSelectContainer;

  constructor($target: Element) {
    this.#$target = $target;
    this.#$StarSelectContainer = new StarSelectContainer();

    this.bindEvent();
  }

  bindEvent() {
    $(".modal-content").addEventListener("click", (event: Event) => {
      if (!(event.target instanceof HTMLImageElement)) return;
      if (event.target.className !== "star-rate-select-img") return;

      const movieId = Number(event.target.dataset.movieId);
      const starRate = Number(event.target.dataset.starRate) + 1;

      this.#$StarSelectContainer.renderStars(movieId, starRate);

      setStarRateToStorage(movieId, starRate);
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
        <div class="modal-image-container">
        ${
          movie.poster_path
            ? /*html */
              `<img 
                class="modal-image skeleton" 
                src="https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path}" 
                alt="${movie.title} 포스터" 
              />`
            : /*html */
              `<div 
                class="modal-image center" 
                style="
                      background-color:white; 
                      color:black; 
                      display:flex; 
                      justify-content:center; 
                      align-items:center; 
                      font-weight:600; 
                      font-size:24px;
                      border-radius: 16px;
                    "
              >
                <span>No Image</span>
              </div>`
        }
        </div>
        <div class="modal-detail-container">
            <div class="modal-movie-detail">
                <p class="modal-movie-genre modal-detail--text">
                  ${
                    movie.genre.length === 0
                      ? `장르 정보 없음`
                      : movie.genre.join(" ")
                  } 
                  <span>
                  <img 
                      src="${filledStarImg}" 
                      alt="별점 ${movie.vote_average}" 
                  />
                  ${movie.vote_average.toFixed(1)}
                  </span>
                </p>
                <p class="modal-movie-description modal-detail--text">
                  ${movie.overview ? movie.overview : "상세 정보 없음"}
                </p>
            </div>
            <div class="modal-star-rate modal-detail--text">
              ${this.#$StarSelectContainer.getStarSelectContainerTemplate(
                movie.id,
                starRate
              )}
            </div>
        </div>
    `;
  }
}
