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

export interface MovieDetail {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
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

export const getMovieDetail = async (movieId: number) => {
  return await tmdbFetcher<MovieDetail>(`/movie/${movieId}?language=ko-KR`);
};
