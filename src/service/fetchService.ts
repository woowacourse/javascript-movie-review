import { getLoadMovies } from "../state/movieState";
import { handleNetworkError } from "./errorService";
import type { InfiniteScrollInstance } from "./scrollService";
import { LOADING_EVENTS } from "../../types/events";

export default async function fetchAndSetLoadingEvent(
  infiniteScrollInstance: InfiniteScrollInstance
) {
  document.dispatchEvent(new CustomEvent(LOADING_EVENTS.START));

  const loadMovies = getLoadMovies();
  let data = null;

  try {
    if (typeof loadMovies === "function") {
      data = await loadMovies();
    }

    document.dispatchEvent(
      new CustomEvent(LOADING_EVENTS.END, {
        detail: { isLastPage: data?.isLastPage ?? false },
      })
    );

    return data;
  } catch (error) {
    document.dispatchEvent(
      new CustomEvent(LOADING_EVENTS.START, {
        detail: { isLastPage: true },
      })
    );
    handleNetworkError(infiniteScrollInstance);
  }
}
