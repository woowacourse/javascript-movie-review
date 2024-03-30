import { fetchAPI } from "./utils/fetchAPI";
import {
  POPULAR_MOVIE_LIST_PATH,
  MOVIE_PATH,
  SEARCH_MOVIE_LIST_PATH,
} from "./utils/paths";
import { FetchedMovieData } from "../types/movies";

export const getPopularMovieList = async (
  page: number = 1
): Promise<FetchedMovieData> => {
  const fetchedMovieData = await fetchAPI(
    POPULAR_MOVIE_LIST_PATH,
    `page=${page}`
  );
  return fetchedMovieData;
};

export const getSearchMovieList = async (
  query: string,
  page: number = 1
): Promise<FetchedMovieData> => {
  const fetchedMovieData = await fetchAPI(
    SEARCH_MOVIE_LIST_PATH,
    `query=${query}&page=${page}`
  );
  return fetchedMovieData;
};

export const getMovieDetail = async (movieId: number | null) => {
  const fetchedMovieDetailData = await fetchAPI(`${MOVIE_PATH}/${movieId}`);

  return fetchedMovieDetailData;
};
