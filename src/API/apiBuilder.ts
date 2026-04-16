import { API_PATH, BASE_URL, DEFAULT_LANGUAGE } from "../constants/constant";

import type {
  FetchMovieDetailResponse,
  FetchMoviePageDataResponse,
  RequestOptions,
  TmdbFetchMoviePageDataResponse,
  TmdbMovieDetailResponse,
  TmdbMovieResponse,
} from "./api.types";

import type { Movie, MovieDetail } from "../../types/movie";

const getMovieEndpointPath = (query: string): string => (query ? API_PATH.SEARCH_MOVIE : API_PATH.POPULAR_MOVIE);
const createTmdbApiUrl = (path: string): URL => {
  const url = new URL(`${BASE_URL.TMDB_BASE_URL}${path}`);

  url.searchParams.set("language", DEFAULT_LANGUAGE);

  return url;
};

export const createMovieApiUrl = (page: number, query: string): URL => {
  const url = createTmdbApiUrl(getMovieEndpointPath(query));
  url.searchParams.set("page", String(page));

  if (query) {
    url.searchParams.set("query", query);
  }

  return url;
};

export const createMovieDetailApiUrl = (movieId: number): URL => {
  return createTmdbApiUrl(API_PATH.MOVIE_DETAIL(movieId));
};

export const createRequestOptions = (): RequestOptions => ({
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
  },
});

export const mapFetchMoviePageDataResponse = (data: TmdbFetchMoviePageDataResponse): FetchMoviePageDataResponse => {
  const movies: Movie[] = data.results.map((movie: TmdbMovieResponse): Movie => {
    return {
      id: movie.id,
      title: movie.title,
      rate: movie.vote_average,
      thumbnail_path: movie.poster_path,
      hero_path: movie.backdrop_path,
      userRating: null,
    };
  });

  return {
    currentPage: data.page ?? 0,
    totalPages: data.total_pages ?? 0,
    results: movies,
  };
};

export const mapFetchMovieDetailResponse = (data: TmdbMovieDetailResponse): FetchMovieDetailResponse => {
  const movieDetail: MovieDetail = {
    poster_path: data.poster_path,
    title: data.title,
    release_year: data.release_date ? data.release_date.slice(0, 4) : "",
    genres: data.genres.map(({ name }) => name),
    rate: data.vote_average,
    overview: data.overview ?? "",
    userRating: null,
  };

  return movieDetail;
};
