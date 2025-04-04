import { DEFAULT_BACK_DROP_URL } from "../constants/movieApi";
import { toElement } from "../utils/domUtils";

interface ModalType {
  id: number;
  backdrop_path: string;
  title: string;
  release_year: number;
  genres: string[];
  vote_average: number;
  overview: string;
  rate_number: number;
}

export const ratingMessages = [
  "평가해주세요",
  "최악이예요",
  "별로예요",
  "보통이에요",
  "재미있어요",
  "명작이에요",
] as const;

export default function Modal({
  id,
  backdrop_path,
  title,
  release_year,
  genres,
  vote_average,
  overview,
  rate_number,
}: ModalType) {
  let dataIndex = 1;

  const filledStars = Array.from(
    { length: rate_number },
    () =>
      `<img src="./images/star_filled.png" class="star" data-index="${dataIndex++}" />`
  ).join("");

  const emptyStars = Array.from(
    { length: 5 - rate_number },
    () =>
      `<img src="./images/star_empty.png" class="star" data-index="${dataIndex++}" />`
  ).join("");

  return toElement(/* html */ `
        <div class="modal-image" >
        <img
            src="${DEFAULT_BACK_DROP_URL}${backdrop_path}"
        />
        </div>
        <div class="modal-description" id=${id}>
          <div class="movie-description-container">
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
            </div>

            <hr />
            <p class="modal-subtitle">내 별점</p>
            <div class="personal-rate-container">
                <div class="personal-rate">
                  ${filledStars}
                  ${emptyStars}
                </div>
                <div class="personal-rate-message">
                    <span class="rating-message">${
                      ratingMessages[rate_number]
                    }</span>
                    <span class="caption"> (${rate_number * 2}/10) </span>
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
