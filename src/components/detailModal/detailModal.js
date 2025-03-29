import {
  defaultOptions,
  URLS,
  defaultQueryObject,
} from "../../setting/settings";
import { createElement } from "../../util/dom";
import { fetchUrl } from "../../util/fetch";
import { getRating } from "../../util/store";
import { updateRating } from "../../util/store";
import { getYear, getGenre } from "./detailModal.utils";
import { setupRatingStars } from "./setupRatingStars";

export default function DetailModal({
  id,
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
  const year = getYear(release_date);
  const genre = getGenre(genres).join(", ");

  $modalContainer.innerHTML = `
        <div class="modal-image">
            <img src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${title}" />
        </div>
        <div class="modal-description">
            <h2 id="modal-title">${title}</h2>
            <p class="category">
              ${year} · ${genre}
            </p>
            <div>
                <p class="modal-text">내 별점</p>
                <div class="estimate-wrap">
                    <div>
                        ${'<img src="./images/star_empty.png" class="estimate-star" />'.repeat(
                          5
                        )}
                    </div>
                    <div class=estimate-description>
                        <span class="modal-text"></span>
                        <span class="modal-text estimate-number">(0/10)</span>
                    </div>
                </div>
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

  setupRatingStars($modalContainer, id);
  return $modalContainer;
}
