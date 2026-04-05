import { getMovies } from "../api/getMovies";
import { SKELETON_NUMBER } from "../constants/constant";
import { movieListView } from "../view/movieListView";
import { movieModel } from "../model/movieModel";
import { addButtonView } from "../view/addButtonView";
import { bannerView } from "../view/bannerView";

export async function popularController() {
  movieListView.renderSkeletonList(SKELETON_NUMBER);

  const popularMovies: MovieResponse | undefined = await getMovies(movieModel.page);

  if (popularMovies === undefined || popularMovies.results.length === 0) {
    movieListView.renderErrorList();
    addButtonView.hideAddButton();
    return;
  };

  movieListView.removeSkeletonList();
  bannerView.renderBanner(popularMovies.results[0]);
  movieListView.renderMovieList(popularMovies.results);
}
