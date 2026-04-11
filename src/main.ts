import { baseUrl } from "./constants/env";
import {
  handleModalCloseButtonClick,
  handleModalEscapeKeydown,
  handleMovieItemClick,
} from "./modalHandler";
import { loadMovieList, loadTopRatedMovie } from "./movieLoader";
import { handleRatingStarClick } from "./ratingHandler";
import {
  handleSearchButtonClick,
  handleSearchInputEnter,
} from "./searchHandler";

addEventListener("load", () => {
  const logo = document.querySelector<HTMLButtonElement>(".logo");
  logo?.addEventListener("click", () => {
    window.location.href = baseUrl;
  });

  const searchButton = document.querySelector("#search-button");
  searchButton?.addEventListener("click", handleSearchButtonClick);

  const searchInput = document.querySelector<HTMLInputElement>("#search-input");
  searchInput?.addEventListener("keyup", (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearchInputEnter();
    }
  });

  const movieList = document.querySelector("#movie-list");
  movieList?.addEventListener("click", handleMovieItemClick);

  const closeModal = document.querySelector("#close-modal");
  closeModal?.addEventListener("click", handleModalCloseButtonClick);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      handleModalEscapeKeydown();
    }
  });

  const stars = document.querySelectorAll<HTMLImageElement>(".stars img");
  stars.forEach((star, index) => {
    star.addEventListener("click", () => handleRatingStarClick(stars, index));
  });

  loadTopRatedMovie();
  loadMovieList();

  const movieListObserver = new IntersectionObserver(
    (entries) => {
      const [sentinelEntry] = entries;
      if (!sentinelEntry.isIntersecting) return;

      loadMovieList();
    },
    { rootMargin: "300px" },
  );

  const sentinel = document.querySelector(".scroll-sentinel");
  if (sentinel) movieListObserver.observe(sentinel);
});
