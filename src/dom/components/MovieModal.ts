import { MovieDetail } from "../../apis/movie/type";
import { renderMyRate } from "./MyRate.ts";

const MODAL_ID = "modal-dialog";
const MY_RATE_CONTAINER_ID = "my-rate-container";

let modalElement: HTMLDialogElement | null = null;

const createMovieModalTemplate = (movie: MovieDetail | null) => `
  <dialog class="modal" id="${MODAL_ID}">
    <button class="close-modal" id="closeModal">
      <img src="./images/modal_button_close.png" alt="닫기" />
    </button>
    <div class="modal-container">
      <div class="modal-image">
        <img
          src="${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/w500${movie?.poster_path}"
          alt=""
        />
      </div>
      <div class="modal-description">
        <h2>${movie?.title ?? "제목을 불러올 수 없습니다."}</h2>
        <p class="category">
          ${(movie?.genres.map((genre) => genre.name).join(", ") ?? "장르를 불러올 수 없습니다.") || "장르 정보가 없습니다."}
        </p>
        <div class="modal-rate">
          평균
          <p class="rate">
            <img src="./images/star_filled.png" alt="별점" class="star" />
            <span>${movie?.vote_average ?? "0"}</span>
          </p>
        </div>
        <div id="${MY_RATE_CONTAINER_ID}"></div>
        <div class="detail">
          <h3>줄거리</h3>
          <p>
            ${(movie?.overview ?? "줄거리를 불러올 수 없습니다.") || "줄거리 정보가 없습니다."}
          </p>
        </div>
      </div>
    </div>
  </dialog>
`;

export const renderMovieModal = (
  parent: HTMLElement,
  movie: MovieDetail | null = null,
) => {
  if (modalElement) {
    // TODO: 매번 remove하지 않으려면 상태 기반으로 데이터가 변경되도록?
    modalElement.remove();
  }

  parent.insertAdjacentHTML("beforeend", createMovieModalTemplate(movie));
  modalElement = document.getElementById(MODAL_ID) as HTMLDialogElement | null;

  const myRateContainer = document.getElementById(MY_RATE_CONTAINER_ID);
  if (myRateContainer) {
    renderMyRate(myRateContainer, 0);
  }

  modalElement?.showModal();

  modalElement?.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) {
      modalElement?.close();
    }
  });

  const closeModalButton = modalElement?.querySelector("button");
  closeModalButton?.addEventListener("click", () => {
    modalElement?.close();
  });
};

export const removeMovieModal = () => {
  modalElement?.close();
  modalElement?.remove();
  modalElement = null;
};

export const hideMovieModal = () => {
  modalElement?.close();
};

export const showMovieModal = () => {
  modalElement?.showModal();
};
