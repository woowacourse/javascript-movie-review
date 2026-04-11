import { baseUrl } from "./constants/env";
import { handleSearch } from "./controllers/search";

import { loadMovieList, loadTopRatedMovie } from "./controllers/movieLoad";
import { getDetailMovie } from "./services/api";
import { clearMovieDetail, renderMovieDetail } from "./renders/movieDetail";
import { closeMovieModal, openMovieModal } from "./renders/movieModal";

addEventListener("load", () => {
  const logo = document.querySelector<HTMLButtonElement>(".logo");
  logo?.addEventListener("click", () => {
    window.location.href = baseUrl;
  });

  const searchButton = document.querySelector("#search-button");
  searchButton?.addEventListener("click", () => {
    handleSearch();
  });

  const searchInput = document.querySelector<HTMLInputElement>("#search-input");
  searchInput?.addEventListener("keyup", (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  });

  const moreButton = document.querySelector("#more-button");
  moreButton?.addEventListener("click", () => {
    loadMovieList();
  });

  const movieList = document.querySelector("#movie-list");
  movieList?.addEventListener("click", async (e) => {
    const target = e.target as HTMLElement;
    const movieItem = target.closest("li");

    if (!movieItem) return;

    const movieId = movieItem.dataset.movieId;
    if (!movieId) return;

    const movieDetail = await getDetailMovie(movieId);
    renderMovieDetail(movieDetail);
    openMovieModal();
  });

  const closeModal = document.querySelector("#close-modal");
  closeModal?.addEventListener("click", () => {
    closeMovieModal();
    clearMovieDetail();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMovieModal();
      clearMovieDetail();
    }
  });

  loadTopRatedMovie();
  loadMovieList();
});
