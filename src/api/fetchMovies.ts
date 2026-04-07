import { MovieResponse } from "../../types/movie.ts";

const apiUrl = import.meta.env.VITE_API_BASE_URL;
const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

export const fetchPopularMovies = async (
  page: number,
): Promise<MovieResponse> => {
  const response = await fetch(
    `${apiUrl}/movie/popular?language=ko-KR&page=${page}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("영화를 불러오는 데 실패했습니다.");
  }

  const data = await response.json();
  return {
    movies: data.results,
    nowPage: data.page,
    totalPages: data.total_pages,
  };
};

export const fetchSearchedMovies = async (
  page: number,
  searchTitle: string,
): Promise<MovieResponse> => {
  const response = await fetch(
    `${apiUrl}/search/movie?query=${encodeURIComponent(searchTitle)}&include_adult=false&language=ko-KR&page=${page}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("영화 검색 중 에러가 발생했습니다.");
  }

  const data = await response.json();
  return {
    movies: data.results,
    nowPage: data.page,
    totalPages: data.total_pages,
  };
};
