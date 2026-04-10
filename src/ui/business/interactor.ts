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
