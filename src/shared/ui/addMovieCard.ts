import MovieCard from "../../features/movie/ui/components/MovieCard";
import { showEmptySearchResult } from "../../features/search/ui/showEmptySearchResult";
import { IMovie } from "../types/movies";

export function addMovieCard(movieList: IMovie[], $movieList: HTMLElement) {
  if (movieList.length === 0) {
    showEmptySearchResult();

    return;
  }

  const $emptySearchResult = document.querySelector(
    ".empty-search-result-container"
  );
  const $moreMoviesButton = document.getElementById("more-movies-button");

  if ($emptySearchResult) {
    $emptySearchResult.remove();
    $moreMoviesButton?.classList.remove("disabled");
  }

  movieList.forEach((movie: IMovie) => {
    $movieList.appendChild(MovieCard(movie));
  });
}
