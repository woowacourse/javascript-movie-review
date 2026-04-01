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
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) continue;
    searchParams.set(key, String(value));
    // TODO: value가 object나 array인 경우?!
  }
  return await tmdbFetcher<TmdbPagination<Movie[]>>(
    `/movie/popular?${searchParams.toString()}`,
  );
};
