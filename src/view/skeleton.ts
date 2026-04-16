export const renderMovieListSkeleton = () => {
  const skeleton = document.querySelector<HTMLUListElement>("#skeleton-list");
  if (!skeleton) return;
  skeleton.hidden = false;
};

export const removeMovieListSkeleton = () => {
  const skeleton = document.querySelector<HTMLUListElement>("#skeleton-list");
  if (!skeleton) return;
  skeleton.hidden = true;
};

export const renderMovieDetailSkeleton = () => {
  const movieModal = document.querySelector<HTMLElement>(".modal");
  if (!movieModal) return;
  movieModal.classList.add("loading");
};

export const removeMovieDetailSkeleton = () => {
  const movieModal = document.querySelector<HTMLElement>(".modal");
  if (!movieModal) return;
  movieModal.classList.remove("loading");
};
