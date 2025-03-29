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
                        <span class="modal-text">명작이에요</span>
                        <span class="modal-text estimate-number">(8/10)</span>
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

  setupRatingStars($modalContainer);
  return $modalContainer;
}

function getYear(date) {
  return date.slice(0, 4);
}

function getGenre(genres) {
  return genres.map((genre) => genre.name);
}

function setupRatingStars($modalContainer) {
  const stars = Array.from($modalContainer.querySelectorAll(".estimate-star"));

  const $description = $modalContainer.querySelector(
    ".estimate-description .modal-text"
  );
  const $score = $modalContainer.querySelector(".estimate-number");

  const messages = [
    "최악이에요",
    "별로예요",
    "보통이에요",
    "재미있어요",
    "명작이에요",
  ];

  stars.forEach((star, index) => {
    star.addEventListener("click", () => {
      const selectedScore = index + 1;

      stars.forEach((s, i) => {
        s.src =
          i < selectedScore
            ? "./images/star_filled.png"
            : "./images/star_empty.png";
      });

      if ($description) $description.textContent = messages[index];
      if ($score) $score.textContent = `(${selectedScore * 2}/10)`;
    });
  });
}
