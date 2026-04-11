import {
  getMovieListElement,
  getSearchFormElement,
  getSearchInputElement,
} from "../domain/movieElement";
import { addEventListenerToElement } from "../utils/eventListener";

export const setupSearchInteraction = (onSearch: (query: string) => void) => {
  const searchForm = getSearchFormElement();

  addEventListenerToElement({
    element: searchForm,
    event: "submit",
    handler: (event) => {
      event.preventDefault();
      const input = getSearchInputElement();
      if (input) {
        onSearch((input as HTMLInputElement).value);
      }
    },
  });
};

export const setupMovieInteraction = (
  onMovieClick: (movieId: string) => void,
) => {
  const movieList = getMovieListElement();
  if (!movieList) return;

  addEventListenerToElement({
    element: movieList,
    event: "click",
    handler: (event) => {
      const target = event.target as HTMLElement;
      const movieItem = target.closest<HTMLElement>(".movie-item");
      if (movieItem?.dataset.movieId) {
        onMovieClick(movieItem.dataset.movieId);
      }
    },
  });
};

export const setupModalCloseInteraction = (onClose: () => void) => {
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") onClose();
  });

  document.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    const isCloseButton = !!target.closest(".close-modal");
    const isBackground = target.classList.contains("modal-background");
    if (isCloseButton || isBackground) onClose();
  });
};
