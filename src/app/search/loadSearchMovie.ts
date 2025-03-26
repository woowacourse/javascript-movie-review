import Fallback from "../../components/fallback/fallback";
import loadMovies from "../../service/loadMovies";
import { $ } from "../../util/querySelector";
import type {
  MovieItemListInstance,
  LongButtonInstance,
} from "../../../types/components";
import type { Result } from "../../../types/TMDB";

type Loader = () => Promise<{ results: Result[]; isLastPage: boolean }>;

export async function loadSearchMovie(
  loader: Loader,
  movieItemList: MovieItemListInstance,
  loadMoreButton: LongButtonInstance
): Promise<void> {
  try {
    await loadMovies(loader, movieItemList, loadMoreButton);
  } catch (e) {
    showFallback();
  }
}

function showFallback(): void {
  $("#thumbnail-container")?.replaceChildren(Fallback());
}
