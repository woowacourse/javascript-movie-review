import { createElement } from "../../utils/createElement.ts";
import { MovieDetail } from "../../../types/movie.ts";
import Rate from "../common/Rate.ts";
import { $ } from "../../utils/dom.ts";

const MovieDetailModal = (movie: MovieDetail): HTMLElement => {
  const modalDetailModal = createElement(/*html*/ `
    <div class="modal-background active">
      <div class="modal">
        <button class="close-modal" aria-label="Close modal"><img src="./images/modal_button_close.png"/></button>
        <div class="modal-container">
          <div class="modal-image">
            <img
              src="${
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w440_and_h660_face/${movie.poster_path}`
                  : "./images/default_poster.png"
              }"
              alt="${movie.title}"
            />
          </div>
          <div class="modal-description">
            <h2>${movie.title}</h2>
            <div>
                ${movie.release_date.slice(0, 4)} ·
                ${movie.genres.map((genre) => genre.name).join(", ")}
            </div>
            <div class="modal-rate-container">
              <div class="label">평균</div>
              <div>${
                Rate({
                  rate: movie.vote_average,
                  className: ["modal-rate"],
                  isFilled: true,
                }).outerHTML
              }</div>
            </div>
            <hr>
            <!-- 별점 컴포넌트로 분리 예정 -->
            <h3>내 별점</h3>
            <div class="my-rate">
                <div>
                    <img src="./images/star_empty.png" class="star" />
                    <img src="./images/star_empty.png" class="star" />
                    <img src="./images/star_empty.png" class="star" />
                    <img src="./images/star_empty.png" class="star" />
                    <img src="./images/star_empty.png" class="star" />
                </div>
                <div class="label">
                    <div>평가하지 않았어요</div>
                    <div class="score">(0/0)</div>
                </div>
            </div>
            <!-- -->
            <hr>
            <h3>줄거리</h3>
            <div class="detail">${movie.overview}</div>
          </div>
        </div>
      </div>
    </div>
  `);

  const closeModal = () => {
    modalDetailModal.classList.remove("active");
    document.body.classList.remove("modal-open");
    modalDetailModal.remove();
  };

  $(".close-modal", modalDetailModal)?.addEventListener("click", closeModal);

  modalDetailModal.addEventListener("click", (e) => {
    if (e.target === modalDetailModal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  return modalDetailModal;
};

export default MovieDetailModal;
