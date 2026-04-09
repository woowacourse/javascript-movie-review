import { getLoadMoreButtonElement, getSearchFormElement } from "../domain/movieElement";
import {
  addEventListenerToElement,
  replaceEventListenerToElement,
} from "../utils/eventListener";

let currentLoadMoreHandler: (() => void) | null = null;

export const setupLoadMoreInteraction = (loadMoreMovies: () => void) => {
  const loadMoreButton = getLoadMoreButtonElement();

  replaceEventListenerToElement({
    element: loadMoreButton,
    event: "click",
    prevHandler: currentLoadMoreHandler,
    nextHandler: loadMoreMovies,
  });

  currentLoadMoreHandler = loadMoreMovies;
};

export const setupSearchInteraction = (onSearch: (query: string) => void) => {
  const searchForm = getSearchFormElement();

  addEventListenerToElement({
    element: searchForm,
    event: "submit",
    handler: (event) => {
      event.preventDefault();
      const form = event.target as HTMLFormElement;
      const input = form.querySelector<HTMLInputElement>("input");
      if (input) {
        onSearch(input.value);
      }
    },
  });
};
