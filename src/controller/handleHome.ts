import { getMovies } from "../api/getMovies";
import { SKELETON_NUMBER } from "../constants/constant";
import { movieListView } from "../view/movieListView";
import { movieModel } from "../model/movieModel";
import { bannerView } from "../view/bannerView";
import { errorMovieList } from "../services/errorMovieList";
import { emptyMovieList } from "../services/emptyMovieList";
import { infiniteScrollView } from "../view/InfiniteScrollView";

export async function handleHome() {
  try {
    movieListView.renderSkeletonList(SKELETON_NUMBER);

    const popularMovies: ApiResult<MovieResponse> = await getMovies(movieModel.page);

    if (!popularMovies.success) {
      errorMovieList.handleHomeError(popularMovies.error);
      return;
    };

    if (popularMovies.data.results.length === 0) {
      emptyMovieList();
      return;
    };
    
    bannerView.renderBanner(popularMovies.data.results[0]);
    movieListView.renderMovieList(popularMovies.data.results);
    infiniteScrollView.updateObserver(popularMovies.data);
  } finally {
    movieListView.removeSkeletonList();
  }
}
