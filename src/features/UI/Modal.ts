import { MovieDetailResponse } from "../../../types/types";
import { getRating } from "../../utils/getRating";
import { MOVIE_RATING } from "../../constants/constant";
import star_filled from "../../images/star_filled.png";
import star_empty from "../../images/star_empty.png";
import modal_close from "../../images/modal_button_close.png";

export default class Modal {
  movieInfo: MovieDetailResponse;
  modalContainer: HTMLElement;

  constructor(data: MovieDetailResponse) {
    this.movieInfo = data;
    this.modalContainer = document.querySelector(".container") as HTMLElement;
  }

  renderModal() {
    const rating = getRating(this.movieInfo.id);
    const scores = [2, 4, 6, 8, 10];
    const starsHtml = scores
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
    this.modalContainer.insertAdjacentHTML(
      "beforeend",
      /*html*/ `
    <div class="modal-background active" id="modalBackground">
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
                  ${starsHtml}
                </div>
                ${
                  rating
                    ? `<span class="detail-label">${MOVIE_RATING[rating as keyof typeof MOVIE_RATING]}</span>
                       <span class="my-rating-value">(${rating}/10)</span>`
                    : `<span class="detail-label">별점을 선택하세요</span>`
                }
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
  }
}
