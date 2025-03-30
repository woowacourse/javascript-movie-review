import MyRate from "./MyRate";

import { closeModal } from "../handlers/modalHandler";
import { handleRateChange } from "../handlers/myRateHandler";

const Modal = (movieDetail: any) => {
  const modalBackground = document.createElement("div");
  modalBackground.classList.add("modal-background", "active");
  modalBackground.id = "modalBackground";

  const releaseDate = movieDetail.release_date.split("-")[0];
  const genres = movieDetail.genres.map((genre: any) => genre.name).join(", ");

  modalBackground.innerHTML = /*html*/ `
      <div class="modal">
        <button class="close-modal" id="closeModal">
          <img src="images/modal_button_close.png" />
        </button>
        <div class="modal-container">
          <div class="modal-image">
            <img
              src="https://image.tmdb.org/t/p/original/${
                movieDetail.poster_path
              }"
            />
          </div>
          <div class="modal-description">
            <h2>${movieDetail.title}</h2>
            <p class="category">
              ${releaseDate} · ${genres}
            </p>
            <p class="modal-rate">
              <span>평균</span>
              <img src="./images/star_filled.png" class="modal-star" />
              <span class="modal-rate-text">${movieDetail.vote_average.toFixed(
                1
              )}</span>
            </p>
            <hr />            
            <section class="my-rate-wrapper">
              ${MyRate(movieDetail.id)}
            </section>            
            <hr />
            <div class="detail-container">
              <h3 class="detail-title">줄거리</h3>
              <p class="detail">
                ${movieDetail.overview}
              </p>
            </div>
          </div>
        </div>
      </div>
  `;

  const closeModalButton = modalBackground.querySelector("#closeModal");
  closeModalButton?.addEventListener("click", () => {
    closeModal();
  });

  modalBackground.addEventListener("click", (e) => {
    if (e.target === modalBackground) {
      closeModal();
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  });

  const rateStarContainer = modalBackground.querySelector(".rate-display");
  rateStarContainer?.addEventListener("change", (e) => {
    handleRateChange(e, movieDetail.id);
  });

  return modalBackground;
};

export default Modal;
