import MoviePost from "../../features/movie/ui/components/MoviePost";
import { showEmptySearchResult } from "../../features/search/ui/showEmptySearchResult";
import { IMovie } from "../types/movies";

export function addMoviePost(movieList: IMovie[], $movieList: HTMLElement) {
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
    $movieList.appendChild(MoviePost(movie));
  });
}
