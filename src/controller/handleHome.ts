import { getMovies } from "../api/getMovies";
import { SKELETON_NUMBER } from "../constants/constant";
import { movieListView } from "../view/movieListView";
import { movieModel } from "../model/movieModel";
import { addButtonView } from "../view/addButtonView";
import { bannerView } from "../view/bannerView";
import { errorMovieList } from "../services/errorMovieList";
import { emptyMovieList } from "../services/emptyMovieList";
import { isLastPage } from "../api/isLastPage";

export async function handleHome() {
  try {
    movieListView.renderSkeletonList(SKELETON_NUMBER);

    const popularMovies: ApiResult<MovieResponse> = await getMovies(movieModel.page);

    if (!popularMovies.success) {
      errorMovieList(popularMovies.error);
      return;
    };

    if (popularMovies.data.results.length === 0) {
      emptyMovieList();
      return;
    };

    if (isLastPage(popularMovies.data)) addButtonView.hideAddButton();
    
    bannerView.renderBanner(popularMovies.data.results[0]);
    movieListView.renderMovieList(popularMovies.data.results);
  } finally {
    movieListView.removeSkeletonList();
  }
}
