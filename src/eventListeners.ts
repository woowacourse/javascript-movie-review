import DOM from "./dom.ts";

export const setupEventListeners = (
  onSearchSubmit: () => void,
  onLoadMore: () => void,
) => {
  const loadMovieButton = DOM.loadMovieButton;
  if (!loadMovieButton) return;

  document.addEventListener("click", (e: MouseEvent) => {
    if ((e.target as HTMLElement).closest(".search-button")) {
      onSearchSubmit();
    }
  });

  document.addEventListener("keydown", (e: KeyboardEvent) => {
    if (
      e.key === "Enter" &&
      (e.target as HTMLElement).closest(".search-input")
    ) {
      onSearchSubmit();
    }
  });

  loadMovieButton.addEventListener("click", onLoadMore);
};
