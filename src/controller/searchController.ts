import { searchMovies } from "../api/searchMovies";
import { movieListRender } from "../view/movieListRender";
import { resetListRender } from "../view/resetListRender";
import { emptyListRender } from "../view/emptyListRender";
import { errorListRender } from "../view/errorListRender";
import { controlMoreButton } from "../view/moreButtonView";
import {
  skeletonListRemover,
  skeletonListRender,
} from "../view/skeletonListRender";
import { SKELETON_NUMBER } from "../constants/constant";
import { movieModel } from "../model/MovieModel";
import { searchView } from "../view/searchView";

export async function searchController(keyword: string) {
  movieModel.startSearch(1, true, keyword);
  searchView.changeToSearchMode(movieModel.searchValue);
  resetListRender();
  skeletonListRender(SKELETON_NUMBER);
  const searchMoviesResult: movieResponse | undefined = await searchMovies(
    movieModel.page,
    movieModel.searchValue
  );

  if (searchMoviesResult === undefined) {
    skeletonListRemover();
    errorListRender();
    return;
  }
  if (searchMoviesResult.total_results === 0) {
    skeletonListRemover();
    emptyListRender();
    return;
  }
  if (searchMoviesResult.page === searchMoviesResult.total_pages) {
    controlMoreButton.hide();
  }

  skeletonListRemover();
  movieListRender(searchMoviesResult.results);
}
