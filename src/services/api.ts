import { apiUrl, apiKey } from "../constants/env";
import { Movies } from "./dto";

export const getMoviePopular = async ({
  page,
}: {
  page: number;
}): Promise<Movies> => {
  const url = `${apiUrl}/movie/popular?page=${page}`;
  const res = await fetch(url, {
    method: "get",
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  return await res.json();
};

export const getTopRatedMovie = async () => {
  const url = `${apiUrl}/movie/top_rated`;
  const res = await fetch(url, {
    method: "get",
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  return await res.json();
};

export const getSearchMovie = async ({
  page,
  query,
}: {
  page: number;
  query: string;
}): Promise<Movies> => {
  const url = `${apiUrl}/search/movie?page=${page}&query=${query}`;
  const res = await fetch(url, {
    method: "get",
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  return await res.json();
};
