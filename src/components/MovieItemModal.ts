import MyRate from "./MyRate";
import extractReleaseYear from "./utils/extractReleaseYear";
import extractGenres from "./utils/extractGenres";

import FilledStarSrc from "../../images/star_filled.png";
import CloseBtnSrc from "../../images/modal_button_close.png";
import ratingStorage from "../store/RatingStorage";
import Movie from "../store/Movie";

export type StarRate = 0 | 1 | 2 | 3 | 4 | 5;

export default function MovieItemModal(
  movieDetails: Movie,
  rate: number
): string {
  const year = extractReleaseYear(movieDetails);
  const genres = extractGenres(movieDetails);
  const movieId = String(movieDetails.id);

  return `
    <div class="modal">
      <button class="close-modal">
        <img src="${CloseBtnSrc}" class="closeModal" />
      </button>
      <div class="modal-container">
        <div class="modal-image">
          <img src="${movieDetails.posterUrl}" />
        </div>
        <div class="modal-description">
          <h2>${movieDetails.title}</h2>
          <p class="category">${year} · ${genres}</p>
          <p class="rate">
            <span>평균</span>
            <img src="${FilledStarSrc}" class="star" />
            <span>${movieDetails.voteAverage.toFixed(1)}</span>
          </p>
          <hr />
          ${MyRate(rate as StarRate, movieId)}
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

document.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;

  if (target.matches(".star")) {
    const starValue = target.getAttribute("data-star-value");
    const id = target.getAttribute("data-id");

    if (starValue && id) {
      const rate = parseInt(starValue, 10) as StarRate;
      ratingStorage.set(id, rate);

      const $myRate = document.querySelector(`.my-rate[data-id="${id}"]`);
      if ($myRate) {
        $myRate.innerHTML = MyRate(rate, id);
      }
    }
  }
});
