import { getSearchParamsFromObject } from "../../utils/getSearchParamsFromObject";
import { tmdbFetcher, TmdbPagination } from "../../utils/tmdbFetcher";
import { Movie } from "../movie/type";
import { SearchedMoviesParameter } from "./type.ts";

export const getSearchedMovies = async (
  params: Partial<SearchedMoviesParameter> = {},
) => {
  const searchParams = getSearchParamsFromObject(params);
  return await tmdbFetcher<TmdbPagination<Movie[]>>(
    `/search/movie?${searchParams.toString()}`,
  );
};
