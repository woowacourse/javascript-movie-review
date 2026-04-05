import { searchMovies } from "../api/searchMovies";
import { SKELETON_NUMBER } from "../constants/constant";
import { movieModel } from "../model/movieModel";
import { searchView } from "../view/searchView";
import { movieListView } from "../view/movieListView";
import { bannerView } from "../view/bannerView";
import { addButtonView } from "../view/addButtonView";

export async function searchController(keyword: string) {
  movieModel.startSearch(1, true, keyword);
  searchView.changeToSearchMode(movieModel.searchValue);
  bannerView.hideBanner();
  addButtonView.showAddButton();
  movieListView.resetMovieList();
  movieListView.renderSkeletonList(SKELETON_NUMBER);

  const searchMoviesResult: ApiResult<MovieResponse> = await searchMovies(
    movieModel.page,
    movieModel.searchValue
  );

  if (!searchMoviesResult.success) {
    console.log("에러 원인:", searchMoviesResult.error);
    movieListView.removeSkeletonList();
    movieListView.renderErrorList();
    return;
  };

  if (searchMoviesResult.data.total_results === 0) {
    movieListView.removeSkeletonList();
    movieListView.renderEmptyList();
    addButtonView.hideAddButton();
    return;
  };
  if (searchMoviesResult.data.page === searchMoviesResult.data.total_pages) {
    addButtonView.hideAddButton();
  };

  movieListView.removeSkeletonList();
  movieListView.renderMovieList(searchMoviesResult.data.results);
}
