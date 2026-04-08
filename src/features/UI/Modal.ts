import { MovieDetailResponse } from "../../../types/types";

export default class Modal {
  movieInfo: MovieDetailResponse;
  modalContainer: HTMLElement;

  constructor(data: MovieDetailResponse) {
    this.movieInfo = data;
    this.modalContainer = document.querySelector(".container") as HTMLElement;
  }

  renderModal() {
    this.modalContainer.innerHTML = /*html*/ `
    <div class="modal-background active" id="modalBackground">
      <div class="modal">
        <button class="close-modal" id="closeModal">
          <img src="./src/images/modal_button_close.png" />
        </button>
        <div class="modal-container">
          <div class="modal-image">
            <img
              src="https://image.tmdb.org/t/p/original/${this.movieInfo.poster_path}"
            />
          </div>
          <div class="modal-description">
            <h2>${this.movieInfo.title}</h2>
            <p class="category">
              ${this.movieInfo.release_date.split("-")[0]} · ${this.movieInfo.genres.map((genre) => genre.name)}
            </p>
            <p class="rate">
              <img src="./src/images/star_filled.png" class="star" /><span
                >${this.movieInfo.vote_average.toFixed(1)}</span
              >
            </p>
            <hr />
            <p class="detail">
              ${this.movieInfo.overview}
            </p>
          </div>
        </div>
      </div>
    </div>`;
  }
}
