import { MovieDetail } from "../../../types/movie";
import { getStarRateMessage } from "../../utils/getStarRateMessage";
import { setMovieStarRate } from "../../utils/starRateStorage";
import createModal from "../createModal";

type MovieDetailContent = Omit<MovieDetail, "posterPath"> & {
  img: HTMLImageElement;
  starRate: number;
};

export const movieDetailModal = createModal();

export const setMovieDetailModalStarRate = (
  starRate: number,
  movieId: number
) => {
  const $myStarRateContent = document.querySelector(".my-rate-content");

  if ($myStarRateContent === null) return;

  $myStarRateContent.innerHTML = `${Array.from({
    length: Math.floor(starRate / 2),
  })
    .map(
      (_, i) =>
        `<img src="images/star_filled.png" class="star" data-index="${i}" data-movie-id="${movieId}" />`
    )
    .join("\n")}
      ${Array.from({ length: 5 - Math.floor(starRate / 2) })
        .map(
          (_, i) =>
            `<img src="images/star_empty.png" class="star" data-index="${
              i + Math.floor(starRate / 2)
            }" data-movie-id="${movieId}"/>`
        )
        .join("\n")}`;
};

export const initializeMovieDetailModalEvent = () => {
  const $myStarRateContainer = document.querySelector(".my-rate-content");

  $myStarRateContainer?.addEventListener("click", (e) => {
    if (e.target === null) return;

    const movieId = Number((e.target as HTMLImageElement).dataset.movieId);
    const starRate =
      2 * (Number((e.target as HTMLImageElement).dataset.index) + 1);

    if (movieId !== undefined && starRate !== undefined) {
      setMovieStarRate(movieId, starRate);
    }

    setMovieDetailModalStarRate(starRate, movieId);
  });
};

(() => {
  movieDetailModal.setContent(`
        <div class="modal-container">
          <div class="modal-image">
            <img src="" alt="" />
          </div>
          <div class="modal-description">
            <h2 class="movie-detail-modal-title"></h2>
            <p class="category">
            </p>
            <p class="rate">
              <span>평균</span>
              <img src="images/star_filled.png" class="star" />
              <span class="movie-detail-modal-vote-average"></span>
            </p>
            </p>
            <hr />
            <div class="my-rate-container">
            <h3>내 별점</h3>
            <div style="display:flex; gap: 4px; align-items: center;">
                <div class="my-rate-content"></div>
                <span class="my-movie-star-rate"></span>
            </div>
            </div>
            <hr />
            <h3>줄거리</h3>
            <span class="movie-detail-modal-overview"></span>
          </div>
        </div>
      `);
  initializeMovieDetailModalEvent();
})();

export const setMovieDetailModalContent = ({
  img,
  title,
  release_date,
  genres,
  voteAverage,
  overview,
  starRate,
}: MovieDetailContent) => {
  const $imageContainer = document.querySelector(".modal-image");
  const $titleContainer = document.querySelector(".movie-detail-modal-title");
  const $categoryContainer = document.querySelector(".category");
  const $voteAverageContainer = document.querySelector(
    ".movie-detail-modal-vote-average"
  );
  const $overViewContainer = document.querySelector(
    ".movie-detail-modal-overview"
  );
  const $starRateTextContainer = document.querySelector(".my-movie-star-rate");

  if (
    !$imageContainer ||
    !$titleContainer ||
    !$categoryContainer ||
    !$voteAverageContainer ||
    !$overViewContainer ||
    !$starRateTextContainer
  )
    return;

  $imageContainer.innerHTML = `<img src="${img.src}" alt="${title}" />`;
  $titleContainer.innerHTML = title;
  $categoryContainer.innerHTML = `${release_date.split("-")[0]} · ${genres
    .map(({ name }) => name)
    .join(", ")}`;
  $voteAverageContainer.innerHTML = `${voteAverage.toFixed(1)}`;
  $overViewContainer.innerHTML = overview;
  $starRateTextContainer.innerHTML = `${getStarRateMessage(
    starRate
  )} (${starRate}/10)`;
};
