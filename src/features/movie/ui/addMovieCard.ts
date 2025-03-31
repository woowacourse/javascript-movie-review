import MovieCard from "./components/MovieCard";
import { showEmptySearchResult } from "../../search/ui/showEmptySearchResult";
import { ICustomMovie, IMovie } from "../../../shared/types/movies";
import { createFragment } from "../../../shared/utils/createFragment";

export function addMovieCard(
  movieList: ICustomMovie[],
  $movieListContainer: HTMLElement
) {
  if (movieList.length === 0) {
    showEmptySearchResult();

    return;
  }

  const $emptySearchResult = document.querySelector(
    ".empty-search-result-container"
  );

  if ($emptySearchResult) {
    $emptySearchResult.remove();
  }

  addMoreMovies($movieListContainer, movieList);
}

function addMoreMovies(
  $movieListContainer: HTMLElement,
  movieList: ICustomMovie[]
) {
  $movieListContainer.appendChild(
    createFragment(movieList.map((movie) => MovieCard(movie)))
  );
}
