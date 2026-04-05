import { getMovies } from "../api/getMovies";
import { searchMovies } from "../api/searchMovies";
import { comparePage } from "../utils/comparePage";
import { SKELETON_NUMBER } from "../constants/constant";
import { movieListView } from "../view/movieListView";

async function getNextData(
  stateObject: StateType,
): Promise<MovieResponse | undefined> {
  if (stateObject.isSearch) {
    return await handleMoreButton.getMoreSearch(
      stateObject.page,
      stateObject.searchValue,
    );
  }

  return await handleMoreButton.getMorePopular(stateObject.page);
}

export const handleMoreButton = {
  handleLoadMore: async (stateObject: StateType): Promise<boolean> => {
    stateObject.page += 1;
    const nextData = await getNextData(stateObject);
    return comparePage(nextData);
  },

  getMorePopular: async (page: number) => {
    movieListView.renderSkeletonList(SKELETON_NUMBER);
    const popularMoviesData: ApiResult<MovieResponse> = await getMovies(page);
    if (!popularMoviesData.success) {
      console.log("에러 원인:", popularMoviesData.error);
      return;
    }
    movieListView.removeSkeletonList();
    movieListView.renderMovieList(popularMoviesData.data.results);

    return popularMoviesData.data;
  },

  getMoreSearch: async (page: number, searchValue: string) => {
    movieListView.renderSkeletonList(SKELETON_NUMBER);
    const searchMoviesData: ApiResult<MovieResponse> = await searchMovies(page, searchValue);
    if (!searchMoviesData.success) {
      console.log("에러 원인:", searchMoviesData.error);
      return;
    }
    movieListView.removeSkeletonList();
    movieListView.renderMovieList(searchMoviesData.data.results);

    return searchMoviesData.data;
  },
};
