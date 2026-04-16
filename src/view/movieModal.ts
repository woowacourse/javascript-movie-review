export const openMovieModal = () => {
  const movieModal = document.querySelector("#modal-background");
  if (!movieModal) return;

  movieModal.classList.add("active");
  document.body.classList.add("modal-open");
};

export const closeMovieModal = () => {
  const movieModal = document.querySelector("#modal-background");
  if (!movieModal) return;

  movieModal.classList.remove("active");
  document.body.classList.remove("modal-open");
};
