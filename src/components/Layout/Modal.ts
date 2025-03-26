import { MovieResult } from "../../../types/movie";
import {
  DEFAULT_MOVIE_DATA,
  PREFIX_POSTER_PATH,
} from "../../constants/constants";

type ModalProps = Pick<
  MovieResult,
  "title" | "poster_path" | "vote_average" | "overview" | "genre_ids"
>;

// TODO: active 상태 토글

export default function Modal(
  { title, poster_path, vote_average, overview, genre_ids }: ModalProps = {
    title: DEFAULT_MOVIE_DATA.title,
    poster_path: DEFAULT_MOVIE_DATA.posterPath,
    vote_average: DEFAULT_MOVIE_DATA.voteAverage,
    overview: DEFAULT_MOVIE_DATA.overview,
    genre_ids: DEFAULT_MOVIE_DATA.genreIds,
  }
) {
  const $modal = document.createElement("div");
  $modal.className = "modal-background";
  $modal.id = "modalBackground";

  $modal.innerHTML = /*html*/ `
    <div class="modal">
      <button class="close-modal" id="closeModal">
        <img src="./images/modal_button_close.png" />
      </button>
      <div class="modal-container">
        <div class="modal-image">
          <img src="${PREFIX_POSTER_PATH}${poster_path}" />
        </div>
        <div class="modal-description">
          <h2>${title}</h2>
          <p class="category">
            2024 · 모험, 애니메이션, 코미디, 드라마, 가족
          </p>
          <p class="rate">
            <span class="rate-average">평균</span>
            <img src="./images/star_filled.png" class="star" /><span
              >${vote_average}</span
            >
          </p>
          <hr />
          <p class="detail">
            ${overview}
          </p>
        </div>
      </div>
    </div>
    `;

  return $modal;
}
