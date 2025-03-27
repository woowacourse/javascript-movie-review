import Fallback from "../../components/fallback/fallback";
import { $ } from "../../util/querySelector";
import type {
  MovieItemListInstance,
  LongButtonInstance,
} from "../../../types/components";
import type { Result } from "../../../types/TMDB";
import { hideSkeleton, showSkeleton } from "../../service/skeleton";

type Loader = () => Promise<{ results: Result[]; isLastPage: boolean }>;

// 1. 재사용이 어차피 안되는데, 함수가 너무 복잡함.
//
export async function loadSearchMovie(
  loader: Loader,
  movieItemList: MovieItemListInstance,
  loadMoreButton: LongButtonInstance
): Promise<void> {
  try {
    showSkeleton();
    const { results, isLastPage } = await loader();
    hideSkeleton();

    if (isLastPage) loadMoreButton.hide();
    movieItemList.render(results);
  } catch (e) {
    showFallback();
  }
}

function showFallback(): void {
  $("#thumbnail-container")?.replaceChildren(Fallback());
}
