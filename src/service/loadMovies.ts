import { Result } from "../../types/TMDB";
import LongButton from "../components/longButton/longButton";
import MovieItemList from "../components/movieItemList/movieItemList";
import { showSkeleton, hideSkeleton } from "./skeleton";

export default async function loadMovies(
  loader: () => Promise<{ results: Result[]; isLastPage: boolean }>,
  movieItemList: ReturnType<typeof MovieItemList>,
  loadMoreButton: ReturnType<typeof LongButton>
) {
  showSkeleton();
  const { results, isLastPage } = await loader();
  hideSkeleton();

  if (isLastPage) loadMoreButton.hide();
  movieItemList.render(results);
}
