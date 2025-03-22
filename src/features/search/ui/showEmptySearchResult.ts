import MoreMoviesButton from "../../../shared/ui/components/MoreMoviesButton";
import EmptySearchResult from "./components/EmptySearchResult";

export function showEmptySearchResult() {
  const $movieContainer = document.getElementById("movie-container");
  const $emptySearchResult = document.querySelector(
    ".empty-search-result-container"
  );

  if (!$emptySearchResult) {
    $movieContainer?.appendChild(EmptySearchResult());
  }

  const $moreMoviesButton = MoreMoviesButton();
  $moreMoviesButton?.classList.add("disabled");
}
