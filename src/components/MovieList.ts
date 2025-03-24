import { MovieResult } from "../../types/movieApiType";
import { DEFAULT_BACK_DROP_URL } from "../constants/movieApi";
import { toElement } from "../utils/domUtils";

export default function MovieList(moviesResult: MovieResult[]) {
  const $ul = document.querySelector(".thumbnail-list");
  const $movieListFragment = document.createDocumentFragment();

  moviesResult.forEach((movie) => {
    const backgroundImage = movie.backdrop_path
      ? `${DEFAULT_BACK_DROP_URL}${movie.backdrop_path}`
      : "./images/default_thumbnail.jpeg";

    const movieItemHTML = /*html*/ `
      <li>
        <div class="item">
          <img
            class="thumbnail"
            src="${backgroundImage}"
            alt="${movie.title}"
          />
          <div class="item-desc">
            <p class="rate loading">
              <img src="./images/star_empty.png" class="star" /><span
                >${movie.vote_average}</span
              >
            </p>
            <strong>${movie.title}</strong>
          </div>
        </div>
      </li>
    `;

    const $movieItem = toElement(movieItemHTML);
    $movieListFragment.appendChild($movieItem);
  });

  $ul?.appendChild($movieListFragment);
  return $ul;
}
