import { IMovieDetail } from "../../types/movies";
import { toElement } from "../../utils/toElement";
import { removeDetailModal } from "../removeDetailModal";

export default function MovieDetailModal(movieDetails: IMovieDetail) {
  const $container = document.getElementById("wrap");
  const movieDetailModal = toElement(`
    <div class="modal-background active" id="modalBackground">
      <div class="modal">
        <button class="close-modal" id="closeModal">
          <img src="./images/modal_button_close.png" />
        </button>
        <div class="modal-container">
          <div class="modal-image">
            <img
              src=${
                movieDetails.backdrop_path
                  ? `https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}`
                  : "./images/nullImage.png"
              }
              alt=${movieDetails.title}
            />
          </div>
          <div class="modal-description">
            <h2>${movieDetails.title}</h2>
            <p class="category">
              ${movieDetails.release_date} · ${movieDetails.genres
    .map((genre) => genre.name)
    .join(", ")}
            </p>
            <p class="rate">
              <img src="./images/star_filled.png" class="star" /><span
                >${movieDetails.vote_average}</span
              >
            </p>
            <hr />
            <p class="detail">
              ${movieDetails.overview}
            </p>
          </div>
        </div>
      </div>
    </div>
`);
  $container?.appendChild(movieDetailModal);

  removeDetailModal();
}
