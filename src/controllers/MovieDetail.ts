import { getDetailParam } from "../apis/config.js";
import MovieModal, { ratingDescriptions } from "./MovieModal.ts";
import MovieService from "../services/MovieService.ts";

const STAR_UNIT = 2;

export async function openModal(event: MouseEvent): Promise<void> {
  const $wrap = document.getElementById("wrap") as HTMLElement;
  const target = event.currentTarget as HTMLElement;
  const movieId = target.dataset.id as string;
  const movieService = new MovieService();
  const movieData = await movieService.fetchMovies(
    `/movie/${movieId}`,
    getDetailParam()
  );
  const $modal = MovieModal(movieData, movieId);

  $wrap.appendChild($modal);
  document.body.style.overflow = "hidden";
}

export function closeModal() {
  const $modalBackground = document.querySelector(".modal-background");
  if ($modalBackground) $modalBackground.remove();
}

function registerModalClose($modal:HTMLElement, $modalBackground:HTMLElement) {
  const closeButton = $modal.querySelector("#closeModal");

  window.addEventListener("keydown", handleKeyDown);
  $modalBackground.addEventListener("click", handleBackgroundClick);
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      closeModal();
      document.body.style.overflow = "auto";
    });
  }

  function handleKeyDown(event:KeyboardEvent) {
    if (event.key === "Escape" && !event.isComposing) {
      closeModal();
      document.body.style.overflow = "auto";
    }
  }

  function handleBackgroundClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.className === "modal-background active") {
      closeModal();
    }
  }
}

function updateStarImages($modal:HTMLElement, rating = 0) {
  const starElements = $modal.querySelectorAll(
    "img.star.point"
  ) as NodeListOf<HTMLImageElement>;
  starElements.forEach((star, idx) => {
    const starRating = (idx + 1) * STAR_UNIT;
    if (starRating <= rating) {
      star.src = "images/star_filled.png";
    } else {
      star.src = "images/star_empty.png";
    }
  });
}

function updateRatingDescription($modal:HTMLElement, rating = 0) {
  const ratingDescriptionEl = $modal.querySelector(
    ".rating-description p:nth-child(1)"
  ) as HTMLParagraphElement;
  const ratingValueEl = $modal.querySelector(
    ".rating-description .rating"
  ) as HTMLElement;
  const defaultRating = STAR_UNIT;

  if (ratingDescriptionEl && ratingValueEl) {
    if (rating === 0) {
      ratingDescriptionEl.innerText = ratingDescriptions[defaultRating] as string;
      ratingValueEl.innerText = `(0/10)`;
    } else {
      ratingDescriptionEl.innerText = ratingDescriptions[rating] as string;
      ratingValueEl.innerText = `(${rating}/10)`;
    }
  }
}

function setRating($modal:HTMLElement, rating = 0) {
  updateStarImages($modal, rating);
  updateRatingDescription($modal, rating);
}

function MovieDetail($modalBackground: HTMLElement, movieId: string) {
  const $modal = $modalBackground.querySelector(".modal") as HTMLElement;
  const storedRating = localStorage.getItem(movieId);
  let selectedRating = storedRating !== null ? Number(storedRating) : 0;

  registerModalClose($modal, $modalBackground);

  setRating($modal, selectedRating);

  const starElements = $modal.querySelectorAll("img.star.point");
  starElements.forEach((star, index) => {
    star.addEventListener("mouseover", () => {
      if (selectedRating) return;
      const hoverRating = (index + 1) * STAR_UNIT;
      setRating($modal, hoverRating);
    });

    star.addEventListener("click", () => {
      const rating = ((index + 1) * STAR_UNIT) as number;
      if (selectedRating === rating) {
        selectedRating = 0;
        setRating($modal);
      } else {
        selectedRating = rating;
        setRating($modal, selectedRating);
        localStorage.setItem(movieId, `${rating}`);
      }
    });
  });
}

export default MovieDetail;
