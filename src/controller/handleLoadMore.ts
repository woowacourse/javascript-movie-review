import { isLastPage } from "../api/isLastPage";
import { SKELETON_NUMBER } from "../constants/constant";
import { movieListView } from "../view/movieListView";
import { movieModel } from "../model/movieModel";
import { addButtonView } from "../view/addButtonView";
import { emptyMovieList } from "../services/emptyMovieList";
import { fetchCurrentModeData } from "../services/fetchCurrentModeData";
import { errorMovieList } from "../services/errorMovieList";

export async function handleLoadMore() {
  try {
    movieListView.renderSkeletonList(SKELETON_NUMBER);

    const response: ApiResult<MovieResponse> = await fetchCurrentModeData();

    if (!response.success) {
      errorMovieList(response.error);
      return;
    };

    if (response.data.results.length === 0) {
      emptyMovieList();
      return;
    };
    
    movieModel.increasePage();
    if(isLastPage(response.data)) addButtonView.hideAddButton();
    movieListView.renderMovieList(response.data.results);
    return;
  } finally {
    movieListView.removeSkeletonList();
  }
}
