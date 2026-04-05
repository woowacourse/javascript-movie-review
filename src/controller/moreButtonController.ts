import { getMovies } from "../api/getMovies";
import { searchMovies } from "../api/searchMovies";
import { comparePage } from "../utils/comparePage";
import { SKELETON_NUMBER } from "../constants/constant";
import { movieListView } from "../view/movieListView";

async function getNextData(
  stateObject: StateType,
): Promise<MovieResponse | undefined> {
  if (stateObject.isSearch) {
    return await moreButtonController.getMoreSearch(
      stateObject.page,
      stateObject.searchValue,
    );
  }

  return await moreButtonController.getMorePopular(stateObject.page);
}

export const moreButtonController = {
  handleLoadMore: async (stateObject: StateType): Promise<boolean> => {
    stateObject.page += 1;
    const nextData = await getNextData(stateObject);
    return comparePage(nextData);
  },

  getMorePopular: async (page: number) => {
    movieListView.renderSkeletonList(SKELETON_NUMBER);
    const popularMoviesData: MovieResponse | undefined = await getMovies(page);
    if (popularMoviesData === undefined) return;
    movieListView.removeSkeletonList();
    movieListView.renderMovieList(popularMoviesData.results);

    return popularMoviesData;
  },

  getMoreSearch: async (page: number, searchValue: string) => {
    movieListView.renderSkeletonList(SKELETON_NUMBER);
    const searchMoviesData = await searchMovies(page, searchValue);
    if (searchMoviesData === undefined) return;
    movieListView.removeSkeletonList();
    movieListView.renderMovieList(searchMoviesData.results);

    return searchMoviesData;
  },
};
