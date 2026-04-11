import { baseUrl } from "./constants/env";
import {
  handleModalCloseButtonClick,
  handleModalEscapeKeydown,
  handleMovieItemClick,
} from "./modalHandler";
import { loadMovieList, loadTopRatedMovie } from "./movieLoader";
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

  const RATING_TEXT = [
    "최악이에요",
    "별로에요",
    "보통이에요",
    "재밌어요",
    "명작이에요",
  ];

  const stars = document.querySelectorAll<HTMLImageElement>(".stars img");
  stars.forEach((star, index) => {
    star.addEventListener("click", () => {
      stars.forEach((currentStar, currentIndex) => {
        currentStar.src =
          currentIndex <= index
            ? "./images/star_filled.png"
            : "./images/star_empty.png";
      });

      const ratingText = document.querySelector(".rating-text");
      if (ratingText) ratingText.textContent = RATING_TEXT[index];

      const ratingValue = document.querySelector("#rating-value");
      if (ratingValue) ratingValue.textContent = ((index + 1) * 2).toString();

      const movieModal = document.querySelector<HTMLElement>(".modal");
      if (!movieModal) return;
      const key = movieModal.dataset.movieId;
      if (!key) return;

      window.localStorage.setItem(key, String((index + 1) * 2));
    });
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
