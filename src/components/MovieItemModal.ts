import Stars from "./Stars";
import extractReleaseYear from "./utils/extractGenres";
import extractGenres from "./utils/extractReleaseYear";
import imageUrl from "../utils/imageUrl";
import MovieDetails from "../types/MovieDetails";

import FilledStarSrc from "../../images/star_filled.png";
import CloseBtnSrc from "../../images/modal_button_close.png";

type StarRate = 0 | 1 | 2 | 3 | 4 | 5;

const STAR_MESSAGES: Record<StarRate, string> = {
  0: "아직 평가하지 않았어요",
  1: "최악이예요",
  2: "별로예요",
  3: "보통이에요",
  4: "재미있어요",
  5: "명작이에요",
} as const;

export default function MovieItemModal(
  movieDetails: MovieDetails,
  rate: number
): string {
  const year = extractReleaseYear(movieDetails);
  const genres = extractGenres(movieDetails);

  return `
      <div class="modal">
        <button class="close-modal" id="closeModal">
          <img src="${CloseBtnSrc}" />
        </button>
        <div class="modal-container">
          <div class="modal-image">
            <img src="${imageUrl(movieDetails.poster_path)}" />
          </div>
          <div class="modal-description">
            <h2>${movieDetails.title}</h2>
            <p class="category">${year} · ${genres}</p>
            <p class="rate">
              <span>평균</span>
              <img src="${FilledStarSrc}" class="star" />
              <span>${movieDetails.vote_average.toFixed(1)}</span>
            </p>
            <hr />
            <div class="my-rate">
              <p>내 별점</p>
              ${Stars(rate)}
              <span>${STAR_MESSAGES[rate as StarRate]} </span>
            </div>
            <hr />
            <p class="detail">
              <p><strong>줄거리</strong></p>
              ${movieDetails.overview}
            </p>
          </div>
        </div>
      </div>
    `;
}
