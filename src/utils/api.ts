import { MovieResponse } from "../../types/movie.ts";

const OPTIONS = {
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    accept: "application/json",
  },
};

export const fetchPopularMovieList = async (
  currentPage: number
): Promise<MovieResponse> => {
  const url = `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${currentPage}`;

  const response = await fetch(url, OPTIONS);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
};

export const fetchSearchMovieList = async (
  search: string,
  currentPage: number
): Promise<MovieResponse> => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${search}&language=ko-KR&page=${currentPage}`;

  const response = await fetch(url, OPTIONS);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
};
