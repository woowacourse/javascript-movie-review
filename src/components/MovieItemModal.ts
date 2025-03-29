import Stars from "./Stars";
import extractReleaseYear from "./utils/extractGenres";
import extractGenres from "./utils/extractReleaseYear";
import imageUrl from "../utils/imageUrl";
import MovieDetails from "../types/MovieDetails";

const FILLED_STAR_SRC = "./images/star_filled.png";
const CLOSE_BTN_SRC = "./images/modal_button_close.png";

export default function MovieItemModal(
  movieDetails: MovieDetails,
  rate: number
): string {
  const year = extractReleaseYear(movieDetails);
  const genres = extractGenres(movieDetails);

  return `
      <div class="modal">
        <button class="close-modal" id="closeModal">
          <img src="${CLOSE_BTN_SRC}" />
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
              <img src="${FILLED_STAR_SRC}" class="star" />
              <span>${movieDetails.vote_average.toFixed(1)}</span>
            </p>
            <hr />
            <div class="my-rate">
              <p>내 별점</p>
              ${Stars(rate)}
              <span>${STAR_MESSAGES[rate]}</span>
              <span>(${rate * 2}/10)</span>
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
