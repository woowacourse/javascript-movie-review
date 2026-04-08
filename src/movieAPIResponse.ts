import type { MovieResponse } from "../types/MovieResponse";
import type { MovieDetail } from "../types/MovieDetail";

export const fetchMovies = async (
  moviePageCount: number,
): Promise<MovieResponse> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${moviePageCount}`,
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
    `https://api.themoviedb.org/3/search/movie?language=ko-KR&query=${searchKeyword}&page=${searchPageCount}`,
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

export const fetchMovieDetail = async (
  movieId: number,
): Promise<MovieDetail> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
      },
    },
  );
  if (!response.ok) {
    throw new Error("FAILED TO FETCH MOVIE DETAIL");
  }

  const data: MovieDetail = await response.json();
  return data;
};
