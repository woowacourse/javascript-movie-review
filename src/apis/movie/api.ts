import { getSearchParamsFromObject } from "../../utils/getSearchParamsFromObject";
import { tmdbFetcher, TmdbPagination } from "../../utils/tmdbFetcher";
import {
  Movie,
  MovieDetail,
  MovieDetailParameter,
  PopularMoviesParameter,
} from "./type.ts";

export const getPopularMovies = async (
  params: Partial<PopularMoviesParameter> = {},
) => {
  const searchParams = getSearchParamsFromObject(params);
  return await tmdbFetcher<TmdbPagination<Movie[]>>(
    `/movie/popular?${searchParams.toString()}`,
  );
};

export const getMovieDetail = async ({
  movieId,
  ...params
}: MovieDetailParameter) => {
  const searchParams = getSearchParamsFromObject(params);
  return await tmdbFetcher<MovieDetail>(
    `/movie/${movieId}?${searchParams.toString()}`,
  );
};
