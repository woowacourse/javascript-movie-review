// 영화 포스터 , 영화 제목, 영화 장르, 별점, 줄거리 정보를 담은 영화 상세 정보 모달을 렌더링
// MovieDetailModal.render(data);
import { MovieDetail } from "../../../types/types";
import { THUMB_NAIL_URL } from "../../constants/constant";

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
                <h2 class="modal-title">${data.title}</h2>
                <p class="modal-release-date-and-genres">${data.release_date.slice(0, 4)} · ${data.genres.map((genre) => genre.name).join(", ")}</p>
                <div class="average">
                    <p class="modal-rating-text">평균</p>
                    <img class="average-star" src="./src/images/star_filled.png">
                    <p class="modal-rating">${data.vote_average.toFixed(1)}</p>
                </div>
                <hr>
                <p class="modal-user-rating">내 별점</p>
                <hr>
                <p class="modal-overview-title">줄거리</p>
                <p class="modal-overview">${data.overview}</p>
            </div>
        </div>
    </div>`;
    document.body.appendChild(this.div);

    this.div.classList.add("active");
  }
}
