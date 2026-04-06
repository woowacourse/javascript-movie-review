import { apiUrl, apiKey } from "../constants/env";

import { parseMovies } from "./mapper";

import { Movies } from "./dto";

interface Configs {
  method?: 'get' | 'post' | 'put' | 'delete';
  query?: Record<string, unknown>;
}

const requestAjax = async (
  url: string,
  { method, query }: Configs = { method: 'get' }
) => {
  const queryString = query
  ? '?' + Object.entries(query)
      .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
      .join('&')
  : '';
  const fullPathUrl = `${apiUrl}${url}${queryString}`;
  const res = await fetch(fullPathUrl, {
    method,
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  if (res.ok) {
    return await res.json();
  }

  const errorBody = await res.json();
  throw new ApiError(errorBody.status_message, errorBody.status_code);
}

export class ApiError extends Error {
  status_code: number;

  constructor(message: string, status_code: number) {
    super(message);
    this.name = "ApiError";
    this.status_code = status_code;
  }
}

export const getMoviePopular = async ({
  page,
}: {
  page: number;
}): Promise<Movies> => {
  const url = `/movie/popular?page=${page}`;
  const data = await requestAjax(url);

  return {
    ...data,
    results: parseMovies(data.results),
  }
};

export const getTopRatedMovie = async () => {
  const url = `/movie/top_rated`;
  const data = await requestAjax(url);

  return {
    ...data,
    results: parseMovies(data.results),
  }
};

export const getSearchMovie = async ({
  page,
  query,
}: {
  page: number;
  query: string;
}): Promise<Movies> => {
  const url = `/search/movie?page=${page}&query=${query}`;
  const data = await requestAjax(url);

  return {
    ...data,
    results: parseMovies(data.results),
  }
};
