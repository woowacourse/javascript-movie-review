import MovieCard from "../../features/movie/ui/components/MovieCard";
import { showEmptySearchResult } from "../../features/search/ui/showEmptySearchResult";
import { IMovie } from "../types/movies";
import { createFragment } from "../utils/createFragment";
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
  if (movieList[0].title) {
    $movieListContainer.appendChild(
      createFragment(
        movieList.map((movie) => MovieCard(movie.title as string, movie))
      )
    );
    return;
  }

  $movieListContainer.appendChild(
    createFragment(
      movieList.map((movie) => MovieCard(movie.name as string, movie))
    )
  );
}
