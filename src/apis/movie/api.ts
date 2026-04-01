import { getSearchParamsFromObject } from "../../utils/getSearchParamsFromObject";
import { tmdbFetcher, TmdbPagination } from "../../utils/tmdbFetcher";

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface PopularMoviesParameter {
  language: string;
  page: number;
}

export const getPopularMovies = async (
  params: Partial<PopularMoviesParameter> = {},
) => {
  const searchParams = getSearchParamsFromObject(params);
  return await tmdbFetcher<TmdbPagination<Movie[]>>(
    `/movie/popular?${searchParams.toString()}`,
  );
};
