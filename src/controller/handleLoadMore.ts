import { SKELETON_NUMBER } from "../constants/constant";
import { movieListView } from "../view/movieListView";
import { movieModel } from "../model/movieModel";
import { fetchCurrentModeData } from "../services/fetchCurrentModeData";
import { errorMovieList } from "../services/errorMovieList";
import { infiniteScrollView } from "../view/infiniteScrollView";

export async function handleLoadMore() {
  if (movieModel.isLoading) return;

  try {
    movieModel.isLoading = true;
    movieListView.renderSkeletonList(SKELETON_NUMBER);
    const nextPage = movieModel.page + 1;
    const isSearch = movieModel.isSearch;
    const searchValue = movieModel.searchValue;
    const response: ApiResult<MovieResponse> = await fetchCurrentModeData(nextPage, isSearch, searchValue);

    if (!response.success) {
      errorMovieList.handleLoadMoreError(response.error);
      infiniteScrollView.disconnect();
      return;
    };

    if (response.data.results.length === 0) {
      infiniteScrollView.disconnect();
      return;
    };
    
    movieModel.increasePage();
    movieListView.renderMovieList(response.data.results);
    infiniteScrollView.updateObserver(response.data);
    return;
  } finally {
    movieModel.isLoading = false;
    movieListView.removeSkeletonList();
  }
}
