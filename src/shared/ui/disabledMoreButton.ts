export function disableMoreButton(totalPages: number, currentPage: number) {
  const $moreMoviesButton = document.getElementById("more-movies-button");
  if (totalPages === currentPage) {
    $moreMoviesButton?.classList.add("disabled");
  }
}
