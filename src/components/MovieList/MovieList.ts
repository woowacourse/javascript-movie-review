import { MovieResult } from "../../../types/movieApiType";
import { PREFIX_BACKDROP_PATH } from "../../constants/constants";

export default function MovieList(moviesResult: MovieResult[]) {
  const $ul = document.querySelector(".thumbnail-list");
  moviesResult.forEach((movieResult) => {
    const $li = document.createElement("li");

    const backgroundImage = movieResult.backdrop_path
      ? `${PREFIX_BACKDROP_PATH}${movieResult.backdrop_path}`
      : "./images/default_thumbnail.jpeg";

    $li.innerHTML = /*html*/ `
      <div class="item">
        <img
          class="thumbnail"
          src="${backgroundImage}"
          alt="${movieResult.title}"
        />
        <div class="item-desc">
          <p class="rate loading">
            <img src="./images/star_empty.png" class="star" alt="star_empty" /><span
              >${movieResult.vote_average}</span
            >
          </p>
          <strong>${movieResult.title}</strong>
        </div>
      </div>
    `;

    $ul?.appendChild($li);
  });
  return $ul;
}
