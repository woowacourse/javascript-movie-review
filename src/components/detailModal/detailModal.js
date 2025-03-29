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
            <p class="rate">
              <span class="rate-text white">평균 </span>
                <img src="./images/star_filled.png" class="star" />
                <span>${vote_average}</span>
            </p>
            <hr/>
          <div class="modal-description-wrap">
            <div class="marginT1rem">
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
            <p class="modal-text marginT1rem">줄거리</p>
            <p class="detail marginT1rem">
              ${overview}
            </p>
        </div>
        </div>`;

  setupRatingStars($modalContainer, id);
  return $modalContainer;
}
