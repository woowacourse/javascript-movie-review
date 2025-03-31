import { getLoadMovies } from "../state/movieState";
import { handleNetworkError } from "./errorService";
import type { InfiniteScrollInstance } from "./scrollService";

export default async function fetchAndSetLoadingEvent(
  infiniteScrollInstance: InfiniteScrollInstance
) {
  document.dispatchEvent(new CustomEvent("loading:start"));

  const loadMovies = getLoadMovies();
  let data = null;

  try {
    if (typeof loadMovies === "function") {
      data = await loadMovies();
    }

    document.dispatchEvent(
      new CustomEvent("loading:end", {
        detail: { isLastPage: data?.isLastPage ?? false },
      })
    );

    return data;
  } catch (error) {
    document.dispatchEvent(
      new CustomEvent("loading:end", {
        detail: { isLastPage: true },
      })
    );
    handleNetworkError(infiniteScrollInstance);
  }
}
