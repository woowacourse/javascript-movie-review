import { ENDPOINTS, DEFAULT_PARAMS } from "./constants";
import { TMDBMovieListResponse, TMDBMovieDetail } from "./types";
import { getData } from "../utils/fetch";

export const fetchPopularMovies = (
  page: number = 1,
): Promise<TMDBMovieListResponse> => {
  const params = new URLSearchParams({
    language: DEFAULT_PARAMS.language,
    page: String(page),
  });

  return getData<TMDBMovieListResponse>(`${ENDPOINTS.POPULAR}?${params}`);
};

export const fetchSearchMovies = (
  query: string,
  page: number = 1,
): Promise<TMDBMovieListResponse> => {
  const params = new URLSearchParams({
    query,
    include_adult: String(DEFAULT_PARAMS.include_adult),
    language: DEFAULT_PARAMS.language,
    page: String(page),
  });

  return getData<TMDBMovieListResponse>(`${ENDPOINTS.SEARCH}?${params}`);
};

export const fetchMovieDetail = (id: number): Promise<TMDBMovieDetail> => {
  const params = new URLSearchParams({ language: DEFAULT_PARAMS.language });
  return getData<TMDBMovieDetail>(`${ENDPOINTS.MOVIE_DETAIL(id)}?${params}`);
};
