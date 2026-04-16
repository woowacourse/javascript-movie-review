import { getMovies } from "../api/getMovies";
import { searchMovies } from "../api/searchMovies";
import { SKELETON_NUMBER } from "../constants/constant";
import { isLastPage } from "../utils/isLastPage";
import { handleResponseError } from "./handleResponseError";

export async function morePopularController(
  state: AppStateType,
  movieListView: MovieListViewType,
  infiniteScrollView: InfiniteScrollViewType,
) {
  try {
    movieListView.skeletonRender(SKELETON_NUMBER);
    const popularMoviesData: movieResponse = await getMovies(
      state.getNextPage(),
    );
    if (isLastPage(popularMoviesData)) infiniteScrollView.stop();
    state.increasePage();
    movieListView.render(popularMoviesData.results);
  } catch (error) {
    handleResponseError(error, movieListView, infiniteScrollView);
  } finally {
    movieListView.skeletonRemover();
  }
}

export async function moreSearchController(
  state: AppStateType,
  movieListView: MovieListViewType,
  infiniteScrollView: InfiniteScrollViewType,
) {
  try {
    movieListView.skeletonRender(SKELETON_NUMBER);
    const searchMoviesData = await searchMovies(
      state.getSearchValue(),
      state.getNextPage(),
    );
    if (isLastPage(searchMoviesData)) infiniteScrollView.stop();
    state.increasePage();
    movieListView.render(searchMoviesData.results);
  } catch (error) {
    handleResponseError(error, movieListView, infiniteScrollView);
  } finally {
    movieListView.skeletonRemover();
  }
}
