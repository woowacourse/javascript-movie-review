import { MovieResult } from "../../types/movieApiType";
import { DEFAULT_BACK_DROP_URL } from "../constants";

export default function ThumbnailList(moviesResult: MovieResult[]) {
  const $thumbnailList = document.querySelector(".thumbnail-list");
  moviesResult.forEach((movieResult) => {
    const $li = document.createElement("li");

    const backgroundImage = movieResult.backdrop_path
      ? `${DEFAULT_BACK_DROP_URL}${movieResult.backdrop_path}`
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
              <img src="./images/star_empty.png" class="star" /><span
                >${movieResult.vote_average}</span
              >
            </p>
            <strong>${movieResult.title}</strong>
          </div>
        </div>
    `;

    $thumbnailList?.appendChild($li);
  });
  return $thumbnailList;
}
