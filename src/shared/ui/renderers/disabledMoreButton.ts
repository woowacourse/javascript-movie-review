import { Movie } from "../../types/movies";

export function disableMoreButton(
  totalPages: number,
  currentPage: number,
  movieList: Movie[]
) {
  const $moreMoviesButton = document.getElementById("more-movies-button");
  if (totalPages === currentPage || movieList.length < 20) {
    $moreMoviesButton?.classList.add("disabled");
  }
}
