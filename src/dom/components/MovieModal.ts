import { getMovieDetail } from "../../apis/movie/api.ts";
import { MovieDetail } from "../../apis/movie/type";
import { renderMyRate } from "./MyRate.ts";

const MODAL_ID = "modal-dialog";
const MY_RATE_CONTAINER_ID = "my-rate-container";

let modalElement: HTMLDialogElement | null = null;

// TODO: 예외 메시지 점검 (애초에 tmdb에 정보가 없으면 null로 오는 듯)
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

export const renderMovieModal = async (
  parent: HTMLElement,
  movieId: number,
) => {
  if (modalElement) {
    modalElement.remove();
  }

  let movie: MovieDetail | null = null;
  try {
    movie = await getMovieDetail({ movieId, language: "ko-KR" });
  } catch {
    alert("영화 정보를 불러올 수 없습니다.");
    return;
  }

  parent.insertAdjacentHTML("beforeend", createMovieModalTemplate(movie));
  modalElement = document.getElementById(MODAL_ID) as HTMLDialogElement | null;

  const myRateContainer = document.getElementById(MY_RATE_CONTAINER_ID);
  if (myRateContainer) {
    renderMyRate(myRateContainer, movieId);
  }

  modalElement?.showModal();
  document.body.classList.add("modal-open");

  modalElement?.addEventListener("cancel", () => {
    hideMovieModal();
  });

  modalElement?.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) {
      hideMovieModal();
    }
  });

  const closeModalButton = modalElement?.querySelector("button");
  closeModalButton?.addEventListener("click", () => {
    hideMovieModal();
  });
};

export const removeMovieModal = () => {
  hideMovieModal();
  modalElement?.remove();
  modalElement = null;
};

export const hideMovieModal = () => {
  modalElement?.remove();
  document.body.classList.remove("modal-open");
};

export const showMovieModal = () => {
  modalElement?.showModal();
};
