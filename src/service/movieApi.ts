import { Movie } from "../types";

export const fetchDefaultMovieList = async (
  pageNum: number,
): Promise<Movie[]> => {
  const data = await request("/movie/popular", { page: pageNum });
  return data.results;
};

export const fetchSearchMovieList = async (
  pageNum: number,
  searchBarText: string,
): Promise<Movie[]> => {
  const data = await request("/search/movie", {
    page: pageNum,
    query: searchBarText,
  });
  return data.results;
};

export const fetchMovieDetail = async (movieId: number) => {
  const data = await request(`/movie/${movieId}`, {});
  return data;
};

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_API_KEY;
const LANGUAGE = "ko-KR";

export const request = async (
  path: string,
  params: Record<string, string | number>,
) => {
  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.append("api_key", API_KEY);
  url.searchParams.append("language", LANGUAGE);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });

  const response = await fetch(url);

  if (!response.ok) throw new Error("영화 정보를 불러오지 못했습니다.");

  return response.json();
};
