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

export const getPopularMovies = async ({
  page,
}: {
  page: number;
}): Promise<Movies> => {
  const url = `${apiUrl}/movie/popular?page=${page}&language=ko-KR`;
  const res = await fetch(url, {
    method: "get",
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  if (res.ok) return await res.json();

  const errorBody = await res.json();
  throw new ApiError(errorBody.status_message, errorBody.status_code);
};

export const getTopRatedMovies = async () => {
  const url = `${apiUrl}/movie/top_rated?language=ko-KR`;
  const res = await fetch(url, {
    method: "get",
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  if (res.ok) return await res.json();

  const errorBody = await res.json();
  throw new ApiError(errorBody.status_message, errorBody.status_code);
};

export const getSearchMovies = async ({
  page,
  query,
}: {
  page: number;
  query: string;
}): Promise<Movies> => {
  const url = `${apiUrl}/search/movie?page=${page}&query=${query}&language=ko-KR`;
  const res = await fetch(url, {
    method: "get",
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  if (res.ok) return await res.json();

  const errorBody = await res.json();
  throw new ApiError(errorBody.status_message, errorBody.status_code);
};

export const getMovieDetail = async (movieId: string): Promise<MovieDetail> => {
  const url = `${apiUrl}/movie/${movieId}?language=ko-KR`;
  const res = await fetch(url, {
    method: "get",
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  if (res.ok) return await res.json();

  const errorBody = await res.json();
  throw new ApiError(errorBody.status_message, errorBody.status_code);
};
