import MyRate from "./MyRate";

import {
  closeModal,
  preventScrollWhenModalOpen,
} from "../handlers/modalHandler";
import { handleRateChange } from "../handlers/myRateHandler";
import { MovieDetail } from "../../types/movies";
import URL from "../../constants/url";

const Modal = (movieDetail: MovieDetail) => {
  const modalBackground = document.createElement("div");
  modalBackground.classList.add("modal-background", "active");
  modalBackground.id = "modalBackground";

  const releaseDate = movieDetail.releaseDate.split("-")[0];
  const genres = movieDetail.genres.map((genre) => genre.name).join(", ");

  modalBackground.innerHTML = /*html*/ `
      <div class="modal">
        <button class="close-modal" id="closeModal">
          <img src="images/modal_button_close.png" />
        </button>
        <div class="modal-container">
          <div class="modal-image">
            <img
              src="${URL.BASE_MODAL_IMAGE}${movieDetail.posterPath}"
            />
          </div>
          <div class="modal-description">
            <section class="modal-description-header">
              <h2 class="modal-title">${movieDetail.title}</h2>
              <p class="category">
                ${releaseDate} · ${genres}
              </p>
              <p class="modal-rate">
                <span class="modal-rate-average-text">평균</span>
                <img src="${
                  URL.BASE_STAR_IMAGE
                }filled.png" class="modal-star" />
                <span class="modal-rate-text">${movieDetail.voteAverage.toFixed(
                  1
                )}</span>
              </p>
            </section>
            <hr />            
            <section class="my-rate-wrapper">
              ${MyRate(movieDetail.id.toString())}
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
    handleRateChange(e, movieDetail.id.toString());
  });

  setTimeout(() => {
    preventScrollWhenModalOpen();
  }, 0);

  return modalBackground;
};

export default Modal;
