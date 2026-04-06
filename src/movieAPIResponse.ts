import type { MovieResponse } from "../types/MovieResponse";

export const fetchMovies = async (
  moviePageCount: number,
): Promise<MovieResponse> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${moviePageCount}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
      },
    },
  );
  if (!response.ok) {
    throw new Error("FAILED TO FETCH POPULAR MOVIES");
  }

  const data: MovieResponse = await response.json();
  return data;
};

export const fetchSearchedMovies = async (
  searchKeyword: string,
  searchPageCount: number,
): Promise<MovieResponse> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${searchKeyword}&page=${searchPageCount}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
      },
    },
  );
  if (!response.ok) {
    throw new Error("FAILED TO FETCH SEARCHED MOVIES");
  }

  const data: MovieResponse = await response.json();
  return data;
};
