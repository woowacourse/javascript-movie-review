import { requestAjax } from "./http";

import { parseMovies } from "./mapper";

import { MovieInfo, Movies } from "./dto";


export const getMoviePopular = async ({
  page,
}: {
  page: number;
}): Promise<Movies> => {
  const url = `/movie/popular`;
  const { data } = await requestAjax(url, { query : { page } });

  return {
    ...data,
    results: parseMovies(data.results),
  }
};

export const getTopRatedMovie = async () => {
  const url = `/movie/top_rated`;
  const { data } = await requestAjax(url);

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
  const { data } = await requestAjax(url, { query: { page, query } });
  
  return {
    ...data,
    results: parseMovies(data.results),
  }
};

export const getMovieById = async ({ id, }: { id: number }): Promise<MovieInfo> => {
  const url = `/movie/${id}`;
  const { data } = await requestAjax(url);

  return data;
};
