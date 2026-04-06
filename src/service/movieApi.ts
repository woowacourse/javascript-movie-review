import { Movie } from "../types";

export const fetchDefaultMovieList = async (
  pageNum: number,
): Promise<Movie[]> => {
  const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_API_KEY}&language=ko-KR&page=${pageNum}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data.results;
};

export const fetchSearchMovieList = async (
  pageNum: number,
  searchBarText: string,
): Promise<Movie[]> => {
  const URL = `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_API_KEY}&query=${encodeURIComponent(searchBarText)}&language=ko-KR&page=${pageNum}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data.results;
};

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_API_KEY;
const LANGUAGE = "ko-KR";

export const fetchMovieList = async (
  path: string,
  pageNum: number,
  searchBarText: string = "",
): Promise<Movie[]> => {
  // 1. /movie/popular, 2. /search/movie
  const url = new URL(`${BASE_URL}${path}`);

  url.searchParams.append("api_key", API_KEY);
  url.searchParams.append("language", LANGUAGE);
  url.searchParams.append("page", `${pageNum}`);

  if (searchBarText !== "") url.searchParams.append("query", searchBarText);

  const response = await fetch(url);

  if (!response.ok) throw new Error("영화 정보를 불러오지 못했습니다.");

  const data = await response.json();
  return data.results;
};
