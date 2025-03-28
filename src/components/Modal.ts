import { DEFAULT_BACK_DROP_URL } from "../constants/movieApi";
import { toElement } from "../utils/domUtils";

interface ModalType {
  backdrop_path: string;
  title: string;
  release_year: number;
  genres: string[];
  vote_average: number;
  overview: string;
}

export default function Modal({
  backdrop_path,
  title,
  release_year,
  genres,
  vote_average,
  overview,
}: ModalType) {
  return toElement(/* html */ `
        <div class="modal-image">
        <img
            src="${DEFAULT_BACK_DROP_URL}${backdrop_path}"
        />
        </div>
        <div class="modal-description">
            <h2>${title}</h2>
            <p class="category">
                ${release_year} · ${genres.join(",")}
            </p>
            <div class="rate-container">
                <div>평균</div>
                <p class="rate">
                    <img src="./images/star_filled.png" class="star" />
                    <span>${vote_average}</span>
                </p>
            </div>

            <hr />
            <p class="modal-subtitle">내 별점</p>
            <div class="personal-rate-container">
                <div class="personal-rate">
                    <img src="./images/star_empty.png" class="star" data-index="1" />
                    <img src="./images/star_empty.png" class="star" data-index="2" />
                    <img src="./images/star_empty.png" class="star" data-index="3" />
                    <img src="./images/star_empty.png" class="star" data-index="4" />
                    <img src="./images/star_empty.png" class="star" data-index="5" />
                </div>
                <div class="personal-rate-message">
                    <span class="rating-message">평가해주세요</span>
                    <span class="caption"> (0/10) </span>
                </div>
            </div>
                

            <hr />
            <p class="modal-subtitle">줄거리</p>
            <p class="detail">
                ${overview}
            </p>
        </div>
    `);
}
