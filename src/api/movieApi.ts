import { apiRequest } from "../utils/api";
import { MovieResponse, MovieDetail } from "./api";

export const fetchPopularMovies = (page: number): Promise<MovieResponse> =>
  apiRequest<MovieResponse>({
    url: `/movie/popular?language=ko-KR&page=${page}`,
  });

export const fetchSearchMovies = (
  query: string,
  page: number,
): Promise<MovieResponse> =>
  apiRequest<MovieResponse>({
    url: `/search/movie?language=ko-KR&query=${encodeURIComponent(query)}&page=${page}`,
  });

export const fetchMovieDetail = (id: number): Promise<MovieDetail> =>
  apiRequest<MovieDetail>({
    url: `/movie/${id}?language=ko-KR`,
  });
