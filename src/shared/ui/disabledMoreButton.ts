import MoreMoviesButton from "./components/MoreMoviesButton";

export function disableMoreButton(totalPages: number, currentPage: number) {
  const $moreMoviesButton = MoreMoviesButton();
  if (totalPages === currentPage) {
    $moreMoviesButton?.classList.add("disabled");
  }
}
