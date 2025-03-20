import { hideElement, showElement, hideImgSkeleton } from "../view/InputView";
import MovieItem from "../components/moveItem/movieItem";
import type { Result } from "../../types/TMDB";
import { createElementsFragment } from "../util/dom";

export default async function createMovieList(
  loadMovies: () => Promise<{ results: Result[]; isLastPage: boolean }>,
  reset?: boolean
) {
  const skeleton = document.querySelector(".skeleton-list");
  showElement(skeleton);
  const { results, isLastPage } = await loadMovies();
  hideElement(skeleton);

  if (isLastPage) {
    document.getElementById("load-more")?.classList.add("hide");
  }

  addMovies(results, reset);
}

function addMovies(results: Result[], reset?: boolean) {
  const $list = document.getElementById("thumbnail-list");

  if (reset && $list) $list.innerHTML = "";

  const movieItems = results.map((result: Result) => {
    const { title, poster_path, vote_average } = result;
    const movieItem = MovieItem({
      title,
      src: poster_path,
      rate: vote_average,
      onload: hideImgSkeleton,
    });
    return movieItem;
  });

  $list?.appendChild(createElementsFragment(movieItems));
}
