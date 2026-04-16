import { searchMovies } from "../api/searchMovies";
import { SKELETON_NUMBER } from "../constants/constant";
import { movieModel } from "../model/movieModel";
import { searchView } from "../view/searchView";
import { movieListView } from "../view/movieListView";
import { bannerView } from "../view/bannerView";
import { errorMovieList } from "../services/errorMovieList";
import { emptyMovieList } from "../services/emptyMovieList";
import { infiniteScrollView } from "../view/infiniteScrollView";

export async function handleSearch(keyword: string) {
  if (movieModel.isLoading) return;
  
  try {
    movieModel.isLoading = true;
    movieModel.startSearch(1, true, keyword);
    searchView.changeToSearchMode(movieModel.searchValue);
    bannerView.hideBanner();
    movieListView.resetMovieList();
    movieListView.renderSkeletonList(SKELETON_NUMBER);

    const searchMoviesResult: ApiResult<MovieResponse> = await searchMovies(
      movieModel.page,
      movieModel.searchValue
    );

    if (!searchMoviesResult.success) {
      errorMovieList.handleSearchError(searchMoviesResult.error);
      infiniteScrollView.disconnect();
      return;
    };

    if (searchMoviesResult.data.total_results === 0) {
      emptyMovieList();
      return;
    };

    movieListView.renderMovieList(searchMoviesResult.data.results);
    infiniteScrollView.updateObserver(searchMoviesResult.data);
    return;
  } finally {
    movieModel.isLoading = false;
    movieListView.removeSkeletonList();
  }
}
