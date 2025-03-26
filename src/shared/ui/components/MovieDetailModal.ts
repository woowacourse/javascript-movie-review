import { IMovieDetail } from "../../types/movies";
import { toElement } from "../../utils/toElement";
import { removeDetailModal } from "../removeDetailModal";

export default function MovieDetailModal(movieDetails: IMovieDetail) {
  const $container = document.getElementById("wrap");
  const rating = 8;
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
                  ${movieDetails.vote_average}
              </span>
            </div>
            <hr class="bar"/>
            <div class="my-rating">
                <h2>
                  내 별점
                </h2>
                <div class="star-rating">
                  ${Array.from({ length: rating / 2 }, () => {
                    return `<img src="./images/star_filled.png" class="star" />`;
                  }).join("")}
                  ${Array.from({ length: 5 - rating / 2 }, () => {
                    return `<img src="./images/star_empty.png" class="star" />`;
                  }).join("")}
                </div>
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
}
