import { MovieDetailResponse } from "../../../types/types";
import { MOVIE_RATING } from "../../constants/constant";
import star_filled from "../../images/star_filled.png";
import star_empty from "../../images/star_empty.png";
import modal_close from "../../images/modal_button_close.png";

export default class Modal {
  movieInfo: MovieDetailResponse;
  modalContainer: HTMLElement;
  modalElement: HTMLElement | null;

  constructor(data: MovieDetailResponse) {
    this.movieInfo = data;
    this.modalContainer = document.querySelector(".container") as HTMLElement;
    this.modalElement = null;
  }

  renderModal(rating: number): void {
    this.modalContainer.insertAdjacentHTML(
      "beforeend",
      /*html*/ `
    <div class="modal-background active">
      <div class="modal" data-id="${this.movieInfo.id}">
        <button class="close-modal" id="closeModal">
          <img src=${modal_close} />
        </button>
        <div class="modal-container">
          <div class="modal-image">
            <img
              src="https://image.tmdb.org/t/p/original/${this.movieInfo.poster_path}"
            />
          </div>
          <div class="modal-description">
            <div class="movie-info">
            <h2>${this.movieInfo.title}</h2>
            <p class="category">
              ${this.movieInfo.release_date.split("-")[0]} · ${this.movieInfo.genres.map((genre) => genre.name).join(", ")}
            </p>
            <p class="rate">
              <span class="rate-label">평균&nbsp;&nbsp;</span>
              <img src=${star_filled} class="star" /><span
                >${this.movieInfo.vote_average.toFixed(1)}</span
              >
            </p>
            </div>
            <hr />
            <div class="my-rating">
              <span class="detail-label">내 별점</span>
              <div class="rating-container">
                <div class="stars">
                  ${this.getStarsHTML(rating ?? 0)}
                </div>
                ${this.getRatingText(rating!)}
              </div>
            </div>
            <hr />
            <p class="detail-content">
              <span class="detail-label">줄거리</span>
              ${this.movieInfo.overview !== "" ? this.movieInfo.overview : "줄거리가 존재하지 않습니다."}
            </p>
          </div>
        </div>
      </div>
    </div>`,
    );

    this.modalElement = this.modalContainer.lastElementChild?.querySelector(
      ".modal",
    ) as HTMLElement;
  }

  updateRating(rating: number): void {
    if (!this.modalElement) {
      return;
    }

    const stars = this.modalElement.querySelectorAll(
      ".stars .star",
    ) as NodeListOf<HTMLImageElement>;
    const ratingText = this.modalElement.querySelector(
      ".my-rating-text",
    ) as HTMLElement;
    const ratingValue = this.modalElement.querySelector(
      ".my-rating-value",
    ) as HTMLElement;

    stars.forEach((star) => {
      const score = Number(star.dataset.id);
      star.src = score <= rating ? star_filled : star_empty;
    });

    ratingText.textContent = MOVIE_RATING[rating as keyof typeof MOVIE_RATING];
    ratingValue.textContent = `(${rating}/10)`;
  }

  getStarsHTML(rating: number): string {
    const scores = [2, 4, 6, 8, 10];

    return scores
      .map(
        (score) => `
      <img
        src="${score <= (rating ?? 0) ? star_filled : star_empty}"
        data-id="${score}"
        class="star"
      />
    `,
      )
      .join("");
  }

  getRatingText(rating?: number): string {
    if (!rating) {
      return `
        <span class="detail-label my-rating-text">별점을 선택하세요</span>
        <span class="my-rating-value"></span>
      `;
    }

    return `
      <span class="detail-label my-rating-text">${MOVIE_RATING[rating as keyof typeof MOVIE_RATING]}</span>
      <span class="my-rating-value">(${rating}/10)</span>
    `;
  }
}
