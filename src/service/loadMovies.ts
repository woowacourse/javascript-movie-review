import { Result } from "../../types/TMDB";
import { showSkeleton, hideSkeleton } from "./skeleton";

export default async function loadMovies(
  loader: () => Promise<{ results: Result[]; isLastPage: boolean }>,
  movieItemList: ReturnType<
    typeof import("../components/movieItemList/movieItemList").default
  >,
  loadMoreButton: ReturnType<
    typeof import("../components/longButton/longButton").default
  >
) {
  showSkeleton();
  const { results, isLastPage } = await loader();
  hideSkeleton();

  if (isLastPage) loadMoreButton.hide();
  movieItemList.render(results);
}
