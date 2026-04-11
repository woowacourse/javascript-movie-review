export const openMovieModal = () => {
  const movieModal = document.querySelector("#modal-background");
  if (!movieModal) return;

  movieModal.classList.add("active");
};

export const closeMovieModal = () => {
  const movieModal = document.querySelector("#modal-background");
  if (!movieModal) return;

  movieModal.classList.remove("active");
};
