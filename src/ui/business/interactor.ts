import { getLoadMoreButtonElement } from "../domain/movieElement";

export const setupLoadMoreInteraction = (loadMoreMovies: () => void) => {
  const loadMoreButton = getLoadMoreButtonElement();
  if (loadMoreButton) loadMoreButton.addEventListener("click", loadMoreMovies);
};
