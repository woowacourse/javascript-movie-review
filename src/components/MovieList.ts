import { MovieResult } from "../../types/movieApiType";
import { DEFAULT_BACK_DROP_URL } from "../constants/movieApi";
import { toElement } from "../utils/domUtils";

export default function MovieList(moviesResult: MovieResult[]) {
  const $ul = document.querySelector(".thumbnail-list");

  moviesResult.forEach((movieResult) => {
    const backgroundImage = movieResult.backdrop_path
      ? `${DEFAULT_BACK_DROP_URL}${movieResult.backdrop_path}`
      : "./images/default_thumbnail.jpeg";

    const movieItemTemplate = /*html*/ `
      <li>
        <div class="item">
          <img
            class="thumbnail"
            src="${backgroundImage}"
            alt="${movieResult.title}"
          />
          <div class="item-desc">
            <p class="rate loading">
              <img src="./images/star_empty.png" class="star" /><span
                >${movieResult.vote_average}</span
              >
            </p>
            <strong>${movieResult.title}</strong>
          </div>
        </div>
      </li>
    `;

    const $movieItemElement = toElement(movieItemTemplate);

    $ul?.appendChild($movieItemElement);
  });
  return $ul;
}
