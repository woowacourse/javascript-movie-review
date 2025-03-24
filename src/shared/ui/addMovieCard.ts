import MovieCard from "../../features/movie/ui/components/MovieCard";
import { showEmptySearchResult } from "../../features/search/ui/showEmptySearchResult";
import { IMovie } from "../types/movies";
import MoreMoviesButton from "./components/MoreMoviesButton";

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
    MoreMoviesButton.removeDisable();
  }

  addMoreMovies($movieListContainer, movieList);
}

function addMoreMovies($movieListContainer: HTMLElement, movieList: IMovie[]) {
  const fragment = document.createDocumentFragment();

  if (movieList[0].title) {
    fragment.append(
      ...movieList.map((movie) => MovieCard(movie.title as string, movie))
    );

    $movieListContainer.appendChild(fragment);
    return;
  }

  fragment.append(
    ...movieList.map((movie) => MovieCard(movie.name as string, movie))
  );

  $movieListContainer.appendChild(fragment);
}
