import Button from "./Button";
import "../../templates/styles/modal.css";
import { ratingDescriptions } from "../controllers/MovieModal.ts";

function MovieDetailModal(
  { title, poster_path, release_date, vote_average, genres, overview },
  movieId
) {
  const $modalBackground = document.createElement("div");
  const $modal = document.createElement("div");
  const $button = Button("", "close-modal");

  $modalBackground.className = "modal-background active";
  $modal.classList.add("modal");

  $button.innerHTML = `<img src="images/modal_button_close.png" />`;
  $button.id = "closeModal";

  const releaseYear = release_date.split("-")[0];
  const genresString = genres.map((genre) => genre.name).join(", ");
  const defaultRating = 2;

  $modal.innerHTML = `
    <div class="modal-container">
      <div class="modal-image">
        <img src="https://image.tmdb.org/t/p/original${poster_path}.jpg" />
      </div>
      <div class="modal-description">
        <h2 class="modal-title">${title}</h2>
        <p class="category">${releaseYear} · ${genresString}</p>
        <div class="average-container">
          <p>평균</p>
          <div class="rate average">
            <img src="images/star_filled.png" class="star" />
            <span>${vote_average.toFixed(1)}</span>
          </div>
        </div>
        <hr />
        <div class="rate">
          <p class="point-text">내 별점</p>
          <div class="star-rating">
            <div class="star-wrap">
              ${'<img src="images/star_empty.png" class="star point" />'.repeat(
                5
              )}
            </div>
            <div class="rating-description">
              <p>${ratingDescriptions[defaultRating]}</p>
              <p class="rating">(0/10)</p>
            </div>
          </div>
        </div>
        <hr />
        <div class="detail">
          <p class="detail summary">줄거리</p>
          <p>${overview}</p>
        </div>
      </div>
    </div>
  `;

  $modal.insertBefore($button, $modal.firstChild);
  $modalBackground.appendChild($modal);

  return $modalBackground;
}

export default MovieDetailModal;
