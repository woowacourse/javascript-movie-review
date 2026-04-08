import { apiUrl, apiKey } from "../constants/env";

import { parseMovies } from "./mapper";

import { MovieInfo, Movies } from "./dto";

interface Configs {
  method?: 'get' | 'post' | 'put' | 'delete';
  query?: Record<string, unknown>;
}

const requestAjax = async (
  url: string,
  { method, query }: Configs = { method: 'get' }
) => {
  const queryString = query ? '?' + new URLSearchParams(query as any).toString() : '';
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
  const url = `/movie/popular`;
  const data = await requestAjax(url, { query : { page } });

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
  const url = `/search/movie`;
  const data = await requestAjax(url, { query: { page, query } });

  return {
    ...data,
    results: parseMovies(data.results),
  }
};

export const getMovieMovieId = async ({ id, }: { id: number }): Promise<MovieInfo> => {
  const url = `/movie/${id}`;
  const data = await requestAjax(url);

  return data;
};
