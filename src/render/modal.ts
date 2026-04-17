import { fetchMovieDetail } from "../api";
import { RATING_LABELS } from "../constants";
import { ratingStore } from "../rating";
import { showErrorToast } from "../toast";
import { MovieDetail } from "../type";
import { throttle } from "./utils/throttle";

function closeMovieModal() {
  const modalBg = document.querySelector("#modalBackground");
  modalBg?.classList.remove("active");
  modalBg?.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function showModalLoading() {
  const modalContainer = document.querySelector<HTMLElement>(".modal-container");
  if (modalContainer) {
    modalContainer.classList.add("is-loading");
    modalContainer.innerHTML = '<div class="modal-spinner"></div>';
  }

  const modalBg = document.querySelector("#modalBackground");
  modalBg?.classList.add("active");
  modalBg?.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function formatRatingText(rating: number): string {
  return `${RATING_LABELS[rating] ?? ""} (${rating}/10)`;
}

function updateStarDisplay(buttons: NodeListOf<HTMLButtonElement>, rating: number | null) {
  buttons.forEach((btn) => {
    const value = Number(btn.dataset.value);
    const img = btn.querySelector<HTMLImageElement>(".star-icon");

    if (img) {
      img.src = rating !== null && value <= rating
        ? `${import.meta.env.BASE_URL}images/star_filled.png`
        : `${import.meta.env.BASE_URL}images/star_empty.png`;
    }
  });
}

function initStarRating(container: HTMLElement, movieId: number) {
  const buttons = container.querySelectorAll<HTMLButtonElement>(".star-btn");
  const ratingTextEl = container.querySelector(".rating-text");

  let savedRating = ratingStore.getRating(movieId);

  updateStarDisplay(buttons, savedRating);
  if (ratingTextEl) ratingTextEl.textContent = savedRating !== null ? formatRatingText(savedRating) : "";

  buttons.forEach((btn) => {
    const value = Number(btn.dataset.value);

    btn.addEventListener("mouseenter", () => {
      updateStarDisplay(buttons, value);
      if (ratingTextEl) ratingTextEl.textContent = formatRatingText(value);
    });

    btn.addEventListener("mouseleave", () => {
      updateStarDisplay(buttons, savedRating);
      if (ratingTextEl) ratingTextEl.textContent = savedRating !== null ? formatRatingText(savedRating) : "";
    });

    btn.addEventListener("click", () => {
      savedRating = value;
      ratingStore.setRating(movieId, value);
      updateStarDisplay(buttons, savedRating);
      if (ratingTextEl) ratingTextEl.textContent = formatRatingText(savedRating);
    });
  });
}

export function openMovieModal(movieDetail: MovieDetail) {
  const modalContainer = document.querySelector<HTMLElement>(".modal-container");
  if (!modalContainer) return;

  const year = movieDetail.release_date?.split("-")[0] ?? "";
  const genreText = movieDetail.genres.map((genre) => genre.name).join(", ");
  const starButtonsMarkup = [2, 4, 6, 8, 10]
    .map((value) => {
      return `<button class="star-btn" data-value="${value}"><img class="star-icon" src="${import.meta.env.BASE_URL}images/star_empty.png" alt="${value}점" /></button>`;
    })
    .join("");

  modalContainer.classList.remove("is-loading");
  modalContainer.innerHTML = `
    <div class="modal-image">
      <img alt="" />
    </div>
    <div class="modal-description">
      <h2 id="modalTitle"></h2>
      <p class="category"></p>
      <div class="rate-row">
        <span class="rate-label">평균</span>
        <img src="${import.meta.env.BASE_URL}images/star_filled.png" class="star" />
        <span class="rate-value"></span>
      </div>
      <hr />
      <div class="rate-row my-rating">
        <span class="rate-label">내 별점</span>
        <div class="star-rating-row">
          <div class="star-rating">${starButtonsMarkup}</div>
          <span class="rating-text"></span>
        </div>
      </div>
      <hr />
      <p class="detail-title">줄거리</p>
      <p class="detail"></p>
    </div>
  `;

  const imgEl = modalContainer.querySelector<HTMLImageElement>(".modal-image img");
  if (imgEl) {
    imgEl.src = `${import.meta.env.VITE_IMAGE_BASE_URL}/w500${movieDetail.poster_path}`;
    imgEl.alt = movieDetail.title;
    imgEl.addEventListener("error", () => {
      imgEl.src = `${import.meta.env.BASE_URL}images/default_movie_image.png`;
    }, { once: true });
  }

  const titleEl = modalContainer.querySelector("h2");
  if (titleEl) titleEl.textContent = movieDetail.title;

  const categoryEl = modalContainer.querySelector(".category");
  if (categoryEl) categoryEl.textContent = `${year} · ${genreText}`;

  const rateValueEl = modalContainer.querySelector(".rate-value");
  if (rateValueEl) rateValueEl.textContent = movieDetail.vote_average.toFixed(1);

  const detailEl = modalContainer.querySelector(".detail");
  if (detailEl) detailEl.textContent = movieDetail.overview;

  initStarRating(modalContainer, movieDetail.id);

  const modalBg = document.querySelector("#modalBackground");
  modalBg?.classList.add("active");
  modalBg?.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

export const handleMovieClick = throttle(async (movieId: number) => {
  showModalLoading();

  try {
    const movieDetail = await fetchMovieDetail(movieId);
    openMovieModal(movieDetail);
  } catch (error) {
    closeMovieModal();
    const title = error instanceof Error ? error.name : "Error";
    const message = error instanceof Error ? error.message : String(error);
    showErrorToast({ title, message });
  }
});

export function initModal() {
  document.querySelector("#closeModal")?.addEventListener("click", closeMovieModal);

  document.querySelector("#modalBackground")?.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) closeMovieModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMovieModal();
  });
}
