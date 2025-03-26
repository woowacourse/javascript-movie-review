import MoreMoviesButton from "../components/MoreMoviesButton";

export function disableMoreButton(totalPages: number, currentPage: number) {
  if (totalPages === currentPage) {
    MoreMoviesButton.addDisable();
  }
}
