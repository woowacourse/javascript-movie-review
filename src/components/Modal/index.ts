import "./index.css";

import { MovieDetail } from "../../types";
import { fetchMovieDetailById } from "../../utils/api";
import filledStarImg from "../../../templates/star_filled.png";
import emptyStarImg from "../../../templates/star_empty.png";
import xButton from "../../../templates/xButton.png";
import { $ } from "../../utils/selector";
import {
  getStarRateFromStorage,
  setStarRateToStorage,
} from "../../utils/storage";

export class Modal {
  #$target;

  constructor($target: Element) {
    this.#$target = $target;

    ($(".x-button") as HTMLImageElement).src = xButton;

    this.bindEvent();
  }

  open(movieId: number) {
    const modalSection = $(".modal-section");

    fetchMovieDetailById(movieId).then((movieDetail) => {
      this.render(movieDetail, movieId);

      if (modalSection instanceof HTMLElement)
        modalSection.style.display = "block";
    });
  }

  close() {
    const modalSection = $(".modal-section");
    const modalHeader = $(".modal-header--text");

    if (modalSection instanceof HTMLElement)
      modalSection.style.display = "none";

    if (modalHeader instanceof HTMLElement) modalHeader.textContent = "";

    this.reset();
  }

  reset() {
    const modalImage = $(".modal-image");
    const modalDesc = $(".modal-movie-description");
    const topPosition = window.scrollY;

    if (modalImage instanceof HTMLImageElement) modalImage.src = "";

    if (modalDesc instanceof HTMLParagraphElement) modalDesc.innerHTML = "";

    window.location.hash = "";
    window.scrollTo(0, topPosition);
  }

  bindEvent() {
    $(".modal-backdrop").addEventListener("click", () => {
      this.close();
    });

    $(".x-button").addEventListener("click", () => {
      this.close();
    });

    window.addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.key === "Escape") this.close();
    });

    $(".modal-content").addEventListener("click", (event: Event) => {
      if (!(event.target instanceof HTMLImageElement)) return;

      const movieId = Number(event.target.dataset.movieId);
      const starRate = Number(event.target.dataset.starRate) + 1;

      this.renderStars(movieId, starRate);

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

  renderStars(movieId: number, starRate: number) {
    const starRateContainer = $(".modal-star-rate");

    if (starRateContainer instanceof HTMLElement)
      starRateContainer.innerHTML = this.getStarSelectContainerTemplate(
        movieId,
        starRate
      );
  }

  getMovieDetailTemplate(movie: MovieDetail, starRate: number) {
    return /*html */ `
        <div class="modal-image-container">
            <img 
                class="modal-image skeleton" 
                src="https://image.tmdb.org/t/p/w220_and_h330_face/${
                  movie.poster_path
                }" 
                alt="${movie.title} 포스터" 
            />
        </div>
        <div class="modal-detail-container">
            <div class="modal-movie-detail">
                <p class="modal-movie-genre modal-detail--text">
                    ${movie.genre.join(" ")} 
                    <span>
                    <img 
                        src="${filledStarImg}" 
                        alt="별점 ${movie.vote_average}" 
                    />
                    ${movie.vote_average.toFixed(1)}
                    </span>
                </p>
                <p class="modal-movie-description modal-detail--text">
                    ${movie.overview ? movie.overview : ""}
                </p>
            </div>
            <div class="modal-star-rate modal-detail--text">
                ${this.getStarSelectContainerTemplate(movie.id, starRate)}
            </div>
        </div>
    `;
  }

  getStarSelectContainerTemplate(movieId: number, starRate: number) {
    const imgArray = this.getStarTemplate(movieId, starRate);

    return /*html*/ `
      내 별점
      <span class="star-select-container">
          ${imgArray.join("")}
      </span>
      <span>${starRate}</span>
      <span class="star-rate-desc">${STAR_RATE_STRING[starRate]}</span>
    `;
  }

  getStarTemplate(movieId: number, starRate: number) {
    return Array.from(
      { length: 5 },
      (_, i) =>
        `<img 
          src="${starRate > i ? filledStarImg : emptyStarImg}" 
          alt="별점" 
          class="star-rate-select-img"
          data-movie-id="${movieId}"
          data-star-rate="${i}"
        />`
    );
  }
}

const STAR_RATE_STRING = [
  "나의 점수는?",
  "정말 별로예요",
  "별로예요",
  "보통이예요",
  "재밌어요",
  "정말 재밌어요",
];
