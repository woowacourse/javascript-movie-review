import { getDetailParam } from "../apis/config";
import MovieModal, { ratingDescriptions } from "../controllers/MovieModal.ts";
import MovieService from "../services/MovieService";

export async function openModal(event) {
  const $wrap = document.getElementById("wrap");
  const movieId = event.currentTarget.dataset.id;
  const movieService = new MovieService();
  const movieData = await movieService.fetchMovies(
    `/movie/${movieId}`,
    getDetailParam()
  );
  const $modal = MovieModal(movieData, movieId);

  $wrap.appendChild($modal);
}

export function closeModal() {
  const $modalBackground = document.querySelector(".modal-background");
  if ($modalBackground) $modalBackground.remove();
}

function registerModalClose($modal, $modalBackground) {
  const closeButton = $modal.querySelector("#closeModal");

  window.addEventListener("keydown", handleKeyDown);
  $modalBackground.addEventListener("click", handleBackgroundClick);
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      closeModal();
    });
  }

  function handleKeyDown(event) {
    if (event.key === "Escape" && !event.isComposing) {
      closeModal();
    }
  }

  function handleBackgroundClick(event) {
    if (event.target.className === "modal-background active") {
      closeModal();
    }
  }
}

function updateStarImages($modal, movieId, rating = 0) {
  const starElements = $modal.querySelectorAll("img.star.point");
  starElements.forEach((star, idx) => {
    const starRating = (idx + 1) * 2;
    if (starRating <= rating) {
      star.src = "../../public/star_filled.png";
    } else {
      star.src = "../../public/star_empty.png";
    }
  });
}

function updateRatingDescription($modal, rating = 0) {
  const ratingDescriptionEl = $modal.querySelector(
    ".rating-description p:nth-child(1)"
  );
  const ratingValueEl = $modal.querySelector(".rating-description .rating");
  const defaultRating = 2;

  if (ratingDescriptionEl && ratingValueEl) {
    if (rating === 0) {
      ratingDescriptionEl.innerText = ratingDescriptions[defaultRating];
      ratingValueEl.innerText = `(0/10)`;
    } else {
      ratingDescriptionEl.innerText = ratingDescriptions[rating];
      ratingValueEl.innerText = `(${rating}/10)`;
    }
  }
}

function setRating($modal, movieId, rating = 0) {
  updateStarImages($modal, movieId, rating);
  updateRatingDescription($modal, rating);
}

function registerModalEventHandlers($modalBackground, movieId) {
  const $modal = $modalBackground.querySelector(".modal");
  const storedRating = localStorage.getItem(movieId);
  let selectedRating = storedRating !== null ? Number(storedRating) : 0;

  registerModalClose($modal, $modalBackground);

  setRating($modal, movieId, selectedRating);

  const starElements = $modal.querySelectorAll("img.star.point");
  // 별 이벤트 등록: hover, mouseout, click
  starElements.forEach((star, index) => {
    star.addEventListener("mouseover", () => {
      if (selectedRating) return;
      const hoverRating = (index + 1) * 2;
      setRating($modal, movieId, hoverRating);
    });

    star.addEventListener("click", () => {
      const rating = (index + 1) * 2;
      if (selectedRating === rating) {
        selectedRating = 0;
        setRating($modal, movieId);
      } else {
        selectedRating = rating;
        setRating($modal, movieId, selectedRating);
        localStorage.setItem(movieId, rating);
      }
    });
  });
}

export default registerModalEventHandlers;
