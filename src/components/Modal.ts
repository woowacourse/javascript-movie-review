import { DEFAULT_BACK_DROP_URL } from "../constants/movieApi";

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
  const $modalContainer = document.querySelector(".modal-container");
  if ($modalContainer) {
    $modalContainer.innerHTML = /* html */ `
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
        <p class="rate">
            <img src="./images/star_filled.png" class="star" /><span
            >${vote_average}</span
            >
        </p>
        <hr />
        <p class="detail">
            ${overview}
        </p>
        </div>
    `;
  }
}
