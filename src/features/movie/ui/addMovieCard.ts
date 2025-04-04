import MovieCard from "./components/MovieCard";
import { showEmptySearchResult } from "../../search/ui/showEmptySearchResult";
import { ICustomMovie } from "../types/movies";
import { createFragment } from "../../../shared/utils/createFragment";
import { intersectionObserver } from "../utils/intersectionObserver";
import { addMoreMovies } from "./addMoreMovies";
import { withSkeleton } from "../../skeleton/ui/withSkeleton";

export function addMovieCard(
  movieList: ICustomMovie[],
  $movieListContainer: HTMLElement
) {
  if (movieList.length === 0) {
    const $targetDiv = document.getElementById("target") as HTMLElement;
    $targetDiv.remove();
    if (!document.querySelector(".item")) {
      showEmptySearchResult();
    }
    return;
  }

  if (!document.getElementById("target")) {
    const newTargetDiv = document.createElement("div");
    newTargetDiv.id = "target";
    const $wrapDiv = document.getElementById("wrap") as HTMLElement;
    $wrapDiv.appendChild(newTargetDiv);

    intersectionObserver(() =>
      withSkeleton($movieListContainer, addMoreMovies($movieListContainer))
    );
  }

  const $emptySearchResult = document.querySelector(
    ".empty-search-result-container"
  );

  if ($emptySearchResult) {
    $emptySearchResult.remove();
  }

  addMoreMovieCards($movieListContainer, movieList);
}

function addMoreMovieCards(
  $movieListContainer: HTMLElement,
  movieList: ICustomMovie[]
) {
  $movieListContainer.appendChild(
    createFragment(movieList.map((movie) => MovieCard(movie)))
  );
}
