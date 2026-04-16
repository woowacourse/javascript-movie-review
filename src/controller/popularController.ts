import { getMovies } from "../api/getMovies";
import { SKELETON_NUMBER } from "../constants/constant";
import { handleResponseError } from "./handleResponseError";

export async function popularController(
  page: number,
  movieListView: MovieListViewType,
  movieBannerView: MovieBannerViewType,
  infiniteScrollView: InfiniteScrollViewType,
) {
  try {
    movieListView.reset();
    infiniteScrollView.start();
    movieListView.skeletonRender(SKELETON_NUMBER);
    const popularMovies: movieResponse = await getMovies(page);
    if (popularMovies.results.length === 0) {
      movieListView.emptyRender();
      infiniteScrollView.stop();
      return;
    }
    movieBannerView.render(popularMovies.results[0]);
    movieListView.render(popularMovies.results);
  } catch (error) {
    handleResponseError(error, movieListView, infiniteScrollView);
  } finally {
    movieListView.skeletonRemover();
  }
}
