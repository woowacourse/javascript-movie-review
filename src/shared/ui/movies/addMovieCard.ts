import MovieCard from "../components/MovieCard";
import { showEmptySearchResult } from "../../../features/search/ui/showEmptySearchResult";
import { IMovie } from "../../types/movies";
import { createFragment } from "../../utils/createFragment";

export function addMovieCard(
  movieList: IMovie[],
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

function addMoreMovies($movieListContainer: HTMLElement, movieList: IMovie[]) {
  $movieListContainer.appendChild(
    createFragment(
      movieList.map((movie) => MovieCard(movie.title as string, movie))
    )
  );
}
