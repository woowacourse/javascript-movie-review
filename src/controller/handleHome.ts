import { getMovies } from "../api/getMovies";
import { SKELETON_NUMBER } from "../constants/constant";
import { movieListView } from "../view/movieListView";
import { movieModel } from "../model/movieModel";
import { addButtonView } from "../view/addButtonView";
import { bannerView } from "../view/bannerView";

export async function handleHome() {
  movieListView.renderSkeletonList(SKELETON_NUMBER);

  const popularMovies: ApiResult<MovieResponse> = await getMovies(movieModel.page);

  if (!popularMovies.success) {
    console.log("에러 원인:", popularMovies.error);
    movieListView.renderErrorList();
    addButtonView.hideAddButton();
    return;
  }

  if (popularMovies.data.results.length === 0) {
    movieListView.renderEmptyList();
    addButtonView.hideAddButton();
    return;
  };

  movieListView.removeSkeletonList();
  bannerView.renderBanner(popularMovies.data.results[0]);
  movieListView.renderMovieList(popularMovies.data.results);
}
