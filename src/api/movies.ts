import { ENDPOINTS, DEFAULT_PARAMS } from "./constants";
import {
  TMDBMovieListResponse,
  TMDBMovieDetail,
  MovieDetail,
  MovieDetailParams,
  PopularMoviesParams,
  SearchMoviesParams,
} from "./types";
import { getData } from "../utils/fetch";
import { toURLSearchParams } from "../utils/searchParams";
import { toMovieDetail } from "../utils/transform";

export const fetchPopularMovies = (
  page: number = 1,
): Promise<TMDBMovieListResponse> => {
  const params: PopularMoviesParams = {
    language: DEFAULT_PARAMS.language,
    page,
  };

  return getData<TMDBMovieListResponse>(
    `${ENDPOINTS.POPULAR}?${toURLSearchParams(params)}`,
  );
};

export const fetchSearchMovies = (
  query: string,
  page: number = 1,
): Promise<TMDBMovieListResponse> => {
  const params: SearchMoviesParams = {
    query,
    include_adult: DEFAULT_PARAMS.include_adult,
    language: DEFAULT_PARAMS.language,
    page,
  };

  return getData<TMDBMovieListResponse>(
    `${ENDPOINTS.SEARCH}?${toURLSearchParams(params)}`,
  );
};

export const fetchMovieDetail = async (id: number): Promise<MovieDetail> => {
  const params: MovieDetailParams = {
    language: DEFAULT_PARAMS.language,
  };
  const data = await getData<TMDBMovieDetail>(
    `${ENDPOINTS.MOVIE_DETAIL(id)}?${toURLSearchParams(params)}`,
  );
  return toMovieDetail(data);
};
