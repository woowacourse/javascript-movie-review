import { IMovieDetail } from "../../../movie/types/movies";
import { movieRatingStorage } from "../../service/movieRatingStorage";
import { toElement } from "../../../../shared/utils/toElement";
import { removeDetailModal } from "../removeDetailModal";
import { updateMovieRating } from "../updateMovieRating";
import MyRatingInDetailModal from "./MyRatingInDetailModal";

export default function MovieDetailModal(movieDetails: IMovieDetail) {
  const $container = document.getElementById("wrap");

  const rating = movieRatingStorage(movieDetails.id);
  const movieDetailModal = toElement(`
    <div class="modal-background active" id="modalBackground">
      <div class="modal" data-id=${movieDetails.id}>
        <button class="close-modal" id="closeModal">
          <img src="./images/modal_button_close.png" />
        </button>
        <div class="modal-container">
          <div class="modal-image">
            <img
              src=${
                movieDetails.poster_path
                  ? `https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`
                  : "./images/nullImage.png"
              }
              alt=${movieDetails.title}
            />
          </div>
          <div class="modal-description">
            <h2>${movieDetails.title}</h2>
            <p class="category">
              ${movieDetails.release_date.slice(0, 4)} · ${movieDetails.genres
    .map((genre) => genre.name)
    .join(", ")}
            </p>
            <div class="rate">
              <p class="rate-title">
                평균
              </p>
              <img src="./images/star_filled.png" class="star" />
              <span class="vote-average">
                  ${movieDetails.vote_average.toFixed(1)}
              </span>
            </div>
            <hr class="bar"/>
            <div class="my-rating-container">
              <h2>내 별점</h2>
                ${MyRatingInDetailModal(rating * 2)}
            </div>
            <hr class="bar"/>
            <div class="detail">
              <h2>줄거리</h2>
              <p>${movieDetails.overview}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
`);
  $container?.appendChild(movieDetailModal);

  removeDetailModal();
  updateMovieRating();
}
