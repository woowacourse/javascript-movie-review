import { apiUrl, apiKey } from "../constants/env";
import { MovieDetail, Movies } from "./dto";

export class ApiError extends Error {
  status_code: number;

  constructor(message: string, status_code: number) {
    super(message);
    this.name = "ApiError";
    this.status_code = status_code;
  }
}

const requestGet = async <T>(path: string): Promise<T> => {
  const res = await fetch(`${apiUrl}${path}`, {
    method: "get",
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  if (res.ok) return await res.json();

  const errorBody = await res.json();
  throw new ApiError(errorBody.status_message, errorBody.status_code);
};

export const getPopularMovies = async ({
  page,
}: {
  page: number;
}): Promise<Movies> => {
  return requestGet<Movies>(`/movie/popular?page=${page}&language=ko-KR`);
};

export const getTopRatedMovies = async () => {
  return requestGet<Movies>(`/movie/top_rated?language=ko-KR`);
};

export const getSearchMovies = async ({
  page,
  query,
}: {
  page: number;
  query: string;
}): Promise<Movies> => {
  return requestGet<Movies>(
    `/search/movie?page=${page}&query=${query}&language=ko-KR`,
  );
};

export const getMovieDetail = async (movieId: string): Promise<MovieDetail> => {
  return requestGet<MovieDetail>(`/movie/${movieId}?language=ko-KR`);
};
