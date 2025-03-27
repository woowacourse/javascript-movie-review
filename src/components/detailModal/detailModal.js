import {
  defaultOptions,
  URLS,
  defaultQueryObject,
} from "../../setting/settings";
import { createElement } from "../../util/dom";
import { fetchUrl } from "../../util/fetch";

export default function DetailModal({
  poster_path,
  title,
  overview,
  vote_average,
  genres,
  release_date,
}) {
  const $modalContainer = createElement("div", {
    className: "modal-container",
  });

  $modalContainer.innerHTML = `
        <div class="modal-image">
            <img src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${title}" />
        </div>
        <div class="modal-description">
            <h2>${title}</h2>
            <p class="category">
              ${getYear(release_date)} · ${getGenre(genres).join(", ")}
            </p>
            <div>
                <p class= "modal-title">내 별점</p>
            </div>
            <hr />
            <p class="rate">
            <span class="white">평균 </span>
              <img src="./images/star_filled.png" class="star" /><span
                >${vote_average}</span
              >
            </p>
            <hr />
            <p class="detail">
              ${overview}
            </p>
        </div>`;

  return $modalContainer;
}

function getYear(date) {
  return date.slice(0, 4);
}

function getGenre(genres) {
  return genres.map((genre) => genre.name);
}
