import { MovieDetail } from "../../apis/movie/type";

const MODAL_ID = "background-container";

let modalElement: HTMLElement | null = null;
let bodyOverflow: string;

const createModalTemplate = (movie: MovieDetail | null) => `
  <div class="modal-background active" id="modalBackground">
    <div class="modal">
      <button class="close-modal" id="closeModal">
        <img src="./images/modal_button_close.png" alt="" />
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
    </div>
  </div>
`;

export const renderModal = (
  parent: HTMLElement,
  movie: MovieDetail | null = null,
) => {
  if (modalElement) {
    modalElement.remove();
  }

  parent.insertAdjacentHTML("beforeend", createModalTemplate(movie));
  modalElement = document.getElementById(MODAL_ID);

  bodyOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";
};

// TODO: 매번 remove하지 않으려면 hide/show + 상태 기반으로 데이터가 변경되도록 해야 함
export const removeModal = () => {
  modalElement?.remove();
  modalElement = null;
  document.body.style.overflow = bodyOverflow;
};

export const hideModal = () => {
  modalElement?.classList.add("hidden");
};

export const showModal = () => {
  modalElement?.classList.remove("hidden");
};
