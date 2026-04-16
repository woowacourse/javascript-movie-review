import { MovieResponse, MovieDetail } from "../../types/movie";
import { API_LANGUAGE, API_REGION, INCLUDE_ADULT } from "../constants/api";

const apiUrl = import.meta.env.VITE_API_BASE_URL;
const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

const REQUEST_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
};

const parseMovieResponse = async (
  response: Response,
  errorMessage: string,
): Promise<MovieResponse> => {
  if (!response.ok) {
    throw new Error(errorMessage);
  }

  try {
    const data = await response.json();
    console.log(data);

    return {
      movies: data.results,
      nowPage: data.page,
      totalPages: data.total_pages,
    };
  } catch {
    throw new Error("서버 응답을 처리할 수 없습니다.");
  }
};

const requestMovieResponse = async (
  url: string,
  errorMessage: string,
): Promise<MovieResponse> => {
  const response = await fetch(url, REQUEST_OPTIONS);
  return parseMovieResponse(response, errorMessage);
};

export const fetchPopularMovies = async (
  page: number,
): Promise<MovieResponse> => {
  return requestMovieResponse(
    `${apiUrl}/movie/popular?language=${API_LANGUAGE}&region=${API_REGION}&page=${page}`,
    "영화 목록을 불러오는 중 에러가 발생했습니다.",
  );
};

export const fetchSearchedMovies = async (
  page: number,
  searchTitle: string,
): Promise<MovieResponse> => {
  return requestMovieResponse(
    `${apiUrl}/search/movie?query=${encodeURIComponent(searchTitle)}&include_adult=${INCLUDE_ADULT}&language=${API_LANGUAGE}&page=${page}`,
    "영화 검색 중 에러가 발생했습니다.",
  );
};

export const fetchMoviesDetail = async (id: number): Promise<MovieDetail> => {
  const response = await fetch(
    `${apiUrl}/movie/${id}?language=${API_LANGUAGE}`,
    REQUEST_OPTIONS,
  );

  if (!response.ok) {
    throw new Error("영화 정보를 불러오는 중 에러가 발생했습니다.");
  }

  try {
    const data = await response.json();
    console.log(data);

    return data;
  } catch {
    throw new Error("서버 응답을 처리할 수 없습니다.");
  }
};
