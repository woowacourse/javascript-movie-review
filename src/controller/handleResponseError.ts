import { ERROR_MESSAGE } from "../constants/error";
import { ResponseError } from "../error/responseError";

export function handleResponseError(
  error: unknown,
  movieListView: MovieListViewType,
  infiniteScrollView: InfiniteScrollViewType,
): void {
  if (error instanceof ResponseError) {
    if (error.type === "HTTP") {
      movieListView.errorRender(ERROR_MESSAGE.HTTP);
      infiniteScrollView.stop();
      return;
    }
    if (error.type === "NETWORK") {
      movieListView.errorRender(ERROR_MESSAGE.NETWORK);
      infiniteScrollView.stop();
      return;
    }
  }
  movieListView.errorRender(ERROR_MESSAGE.DEFAULT);
  infiniteScrollView.stop();
}
