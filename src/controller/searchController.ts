import { searchMovies } from "../api/searchMovies";
import { SKELETON_NUMBER } from "../constants/constant";
import { isLastPage } from "../utils/isLastPage";
import { handleResponseError } from "./handleResponseError";

export async function searchController(
  state: AppStateType,
  movieListView: MovieListViewType,
  infiniteScrollView: InfiniteScrollViewType,
) {
  try {
    movieListView.reset();
    infiniteScrollView.start();
    movieListView.skeletonRender(SKELETON_NUMBER);
    const searchMoviesResult: movieResponse = await searchMovies(
      state.getSearchValue(),
      state.getPage(),
    );
    if (searchMoviesResult.total_results === 0) {
      movieListView.emptyRender();
      infiniteScrollView.stop();
      return;
    }
    if (isLastPage(searchMoviesResult)) {
      infiniteScrollView.stop();
    }
    movieListView.render(searchMoviesResult.results);
  } catch (error) {
    handleResponseError(error, movieListView, infiniteScrollView);
  } finally {
    movieListView.skeletonRemover();
  }
}
