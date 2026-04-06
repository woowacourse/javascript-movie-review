import { getMovies } from "../api/getMovies";
import { searchMovies } from "../api/searchMovies";
import { isLastPage } from "../api/isLastPage";
import { SKELETON_NUMBER } from "../constants/constant";
import { movieListView } from "../view/movieListView";
import { movieModel } from "../model/movieModel";
import { addButtonView } from "../view/addButtonView";

async function fetchCurrentModeData() {
  if (movieModel.isSearch) {
    return await searchMovies(movieModel.page, movieModel.searchValue);
  }
  return await getMovies(movieModel.page);
}

export async function handleLoadMore() {
  try {
    movieModel.increasePage();
    movieListView.renderSkeletonList(SKELETON_NUMBER);

    const response: ApiResult<MovieResponse> = await fetchCurrentModeData();

    if (!response.success) {
      console.log("에러 원인:", response.error);
      return;
    };

    if(isLastPage(response.data)) addButtonView.hideAddButton();

    movieListView.renderMovieList(response.data.results);
    return;
  } finally {
    movieListView.removeSkeletonList();
  }
}
