import {
  handleModalBackdropClick,
  handleModalCloseButtonClick,
  handleModalEscapeKeydown,
  handleMovieItemClick,
} from "./handlers/modalHandler";
import { handleRatingStarClick } from "./handlers/ratingHandler";
import {
  handleSearchButtonClick,
  handleSearchInputEnter,
} from "./handlers/searchHandler";

export const bindSearchEvents = () => {
  const searchButton = document.querySelector("#search-button");
  searchButton?.addEventListener("click", handleSearchButtonClick);

  const searchInput = document.querySelector<HTMLInputElement>("#search-input");
  searchInput?.addEventListener("keyup", (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearchInputEnter();
    }
  });
};

export const bindRatingEvents = () => {
  const stars = document.querySelectorAll<HTMLImageElement>(".stars img");
  stars.forEach((star, index) => {
    star.addEventListener("click", () => handleRatingStarClick(index));
  });
};

export const bindModalEvents = () => {
  const movieList = document.querySelector("#movie-list");
  movieList?.addEventListener("click", handleMovieItemClick);

  const closeModal = document.querySelector("#close-modal");
  closeModal?.addEventListener("click", handleModalCloseButtonClick);

  const modalBackground = document.querySelector("#modal-background");
  modalBackground?.addEventListener("click", () => {
    handleModalBackdropClick();
  });

  const modal = document.querySelector(".modal");
  modal?.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  document.addEventListener("keydown", (event) => {
    const modalBackground = document.querySelector("#modal-background");
    if (!modalBackground?.classList.contains("active")) return;
    console.log("esc");

    if (event.key === "Escape") {
      handleModalEscapeKeydown();
    }
  });
};
