import MoreMoviesButton from "./components/MoreMoviesButton";

export const disableMoreButton = (totalPages: number, currentPage: number) => {
  if (totalPages === currentPage) {
    MoreMoviesButton.addDisable();
  }
};
