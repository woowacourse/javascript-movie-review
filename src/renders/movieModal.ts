export function openMovieModal() {
  const movieModal = document.querySelector("#modal-background");
  if (!movieModal) return;

  movieModal.classList.add("active");
}

export function closeMovieModal() {
  const movieModal = document.querySelector("#modal-background");
  if (!movieModal) return;

  movieModal.classList.remove("active");
}
