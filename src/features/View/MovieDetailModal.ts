// 영화 포스터 , 영화 제목, 영화 장르, 별점, 줄거리 정보를 담은 영화 상세 정보 모달을 렌더링
// MovieDetailModal.render(data);
import { MovieDetail } from "../../../types/types";
import { THUMB_NAIL_URL } from "../../constants/constant";

const star_score: Record<number, string> = {
  2: "최악이예요",
  4: "별로예요",
  6: "보통이예요",
  8: "재미있어요",
  10: "명작이예요",
};

export default class MovieDetailModal {
  div = document.createElement("div");

  reset() {
    this.div.innerHTML = "";
    this.div.classList.remove("active");
  }

  render(data: MovieDetail) {
    // 포스터
    // 내용
    // - 제목
    // - 영화 제목
    // - 장르
    // - 평균 별점
    // - 내 별점
    // - 줄거리

    this.div.className = "modal-background";
    this.div.innerHTML = /*html*/ `
    <div class="modal">
        <div class="modal-container">
            <img class="modal-image" src="${THUMB_NAIL_URL}${data.poster_path}" alt="${data.title}">
            <div class="modal-description">
                <button class="close-modal">
                    <img src="./src/images/modal_button_close.png" alt="닫기">
                </button>
                <h2 class="modal-title">${data.title}</h2>
                <p class="modal-release-date-and-genres">${data.release_date.slice(0, 4)} · ${data.genres.map((genre) => genre.name).join(", ")}</p>
                <div class="average">
                    <p class="modal-rating-text">평균</p>
                    <img class="average-star" src="./src/images/star_filled.png">
                    <p class="modal-rating">${data.vote_average.toFixed(1)}</p>
                </div>
                <hr>
                <div class="modal-user-rating">
                  <p class="modal-user-rating-text">내 별점</p>
                  <div class="star-rating">
                    <div class="stars-row">
                      ${[1, 2, 3, 4, 5].map((i) => `<img class="modal-star" data-index="${i}" src="./src/images/star_empty.png">`).join("")}
                    </div>
                    <div class="rating-text">
                      <span class="rating-label"></span>
                      <span class="rating-score"></span>
                    </div>
                  </div>
                </div>
                <hr>
                <p class="modal-overview-title">줄거리</p>
                <p class="modal-overview">${data.overview}</p>
            </div>
        </div>
    </div>`;
    document.body.appendChild(this.div);
    this.div.classList.add("active");

    this.div
      .querySelector(".close-modal")!
      .addEventListener("click", () => this.close());

    this.#initStarRating(data.id);
  }

  #initStarRating(movieId: number) {
    const stars = this.div.querySelectorAll<HTMLImageElement>(".modal-star");
    const labelEl = this.div.querySelector<HTMLSpanElement>(".rating-label")!;
    const scoreEl = this.div.querySelector<HTMLSpanElement>(".rating-score")!;

    const saved = localStorage.getItem(`rating-${movieId}`);
    if (saved) this.#updateStars(stars, labelEl, scoreEl, Number(saved));

    stars.forEach((star) => {
      star.addEventListener("click", () => {
        const index = Number(star.dataset.index);
        this.#updateStars(stars, labelEl, scoreEl, index);
        localStorage.setItem(`rating-${movieId}`, String(index));
      });
    });
  }

  #updateStars(
    stars: NodeListOf<HTMLImageElement>,
    labelEl: HTMLSpanElement,
    scoreEl: HTMLSpanElement,
    index: number,
  ) {
    stars.forEach((star, i) => {
      if (i < index) {
        star.src = "./src/images/star_filled.png";
      } else {
        star.src = "./src/images/star_empty.png";
      }
    });
    const score = index * 2;
    labelEl.textContent = star_score[score];
    scoreEl.textContent = `(${score}/10)`;
  }

  close() {
    this.div.classList.remove("active");
  }
}
