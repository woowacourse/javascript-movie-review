import { getLoadMoreButtonElement } from "../domain/movieElement";
import { replaceEventListenerToElement } from "../utils/eventListener";

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
