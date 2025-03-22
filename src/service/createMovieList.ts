import { hideElement, showElement, hideImgSkeleton } from "../view/InputView";
import MovieItem from "../components/moveItem/movieItem";
import type { Result } from "../../types/TMDB";
import { createElementsFragment } from "../util/dom";

export default async function createMovieList(
  loadMovies: () => Promise<{ results: Result[]; isLastPage: boolean }>,
  reset?: boolean
) {
  const skeleton = document.querySelector(".skeleton-list");

  const loadMore = document.getElementById("load-more");
  showElement(skeleton);
  hideElement(loadMore);
  const { results, isLastPage } = await loadMovies();
  showElement(loadMore);
  hideElement(skeleton);

  if (isLastPage) {
    document.getElementById("load-more")?.classList.add("hide");
  }

  renderMovies(results, reset);
}

function renderMovies(results: Result[], reset?: boolean) {
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
