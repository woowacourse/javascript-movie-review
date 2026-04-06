import { apiUrl, apiKey } from "../constants/env";

import { parseMovies } from "./mapper";

import { Movies } from "./dto";

const requestAjax = async (
  url: string,
) => {
  const fullPathUrl = `${apiUrl}${url}`;
  const res = await fetch(fullPathUrl, {
    method: "get",
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
