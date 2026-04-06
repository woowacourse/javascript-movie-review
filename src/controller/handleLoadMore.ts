import { getMovies } from "../api/getMovies";
import { searchMovies } from "../api/searchMovies";
import { isLastPage } from "../api/isLastPage";
import { SKELETON_NUMBER } from "../constants/constant";
import { movieListView } from "../view/movieListView";
import { movieModel } from "../model/movieModel";
import { addButtonView } from "../view/addButtonView";

async function fetchCurrentModeData(nextPage: number) {
  if (movieModel.isSearch) {
    return await searchMovies(nextPage, movieModel.searchValue);
  }
  return await getMovies(nextPage);
}

export async function handleLoadMore() {
  const nextPage = movieModel.page + 1;

  try {
    movieModel.increasePage();
    movieListView.renderSkeletonList(SKELETON_NUMBER);

    const response: ApiResult<MovieResponse> = await fetchCurrentModeData(nextPage);

    if (!response.success) {
      console.log("에러 원인:", response.error);
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
