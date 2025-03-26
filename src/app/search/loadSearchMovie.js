import { showSkeleton, hideSkeleton } from "../../service/skeleton";
import Fallback from "../../components/fallback/fallback";
import loadMovies from "../../service/loadMovies";
import { $ } from "../../util/querySelector";

export async function loadSearchMovie(loader, movieItemList, loadMoreButton) {
  try {
    await loadMovies(loader, movieItemList, loadMoreButton);
  } catch (e) {
    showFallback();
  }
}

function showFallback() {
  $("#thumbnail-container")?.replaceChildren(Fallback());
}
