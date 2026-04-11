import { MovieDetail } from "../../apis/movie/type";

const MODAL_ID = "modal-dialog";

let modalElement: HTMLDialogElement | null = null;

const createModalTemplate = (movie: MovieDetail | null) => `
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
        <div class="my-rate">
          <h3>내 별점</h3>
          <div>
            <div>
              <button>
                <img src="./images/star_filled.png" alt="" class="star" />
              </button>
              <button>
                <img src="./images/star_filled.png" alt="" class="star" />
              </button>
              <button>
                <img src="./images/star_filled.png" alt="" class="star" />
              </button>
              <button>
                <img src="./images/star_filled.png" alt="" class="star" />
              </button>
              <button>
                <img src="./images/star_filled.png" alt="" class="star" />
              </button>
            </div>
            <span class="comment">별점을 남겨주세요.</span>
            <span class="score">(0/10)</span>
          </div>
        </div>
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

export const renderModal = (
  parent: HTMLElement,
  movie: MovieDetail | null = null,
) => {
  if (modalElement) {
    modalElement.remove();
  }

  parent.insertAdjacentHTML("beforeend", createModalTemplate(movie));
  modalElement = document.getElementById(MODAL_ID) as HTMLDialogElement | null;
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

// TODO: 매번 remove하지 않으려면 hide/show + 상태 기반으로 데이터가 변경되도록 해야 함
export const removeModal = () => {
  modalElement?.close();
  modalElement?.remove();
  modalElement = null;
};

export const hideModal = () => {
  modalElement?.close();
};

export const showModal = () => {
  modalElement?.showModal();
};
