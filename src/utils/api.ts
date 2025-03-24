import { MovieResponse } from "../../types/movie.ts";

const OPTIONS = {
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    accept: "application/json",
  },
};

export type Response =
  | {
      status: "success";
      data: MovieResponse;
    }
  | {
      status: "fail";
      data: [];
    };

export const fetchPopularMovieList = async (
  currentPage: number
): Promise<Response> => {
  try {
    const url = `https://api.themoviedb.org/3/movie/popular?include_adult=false&language=ko-KR&page=${currentPage}`;
    const response = await fetch(url, OPTIONS);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return { status: "success", data: data };
  } catch (error) {
    console.error("데이터 로드 실패:", error);
    return { status: "fail", data: [] };
  }
};

export const fetchSearchMovieList = async (
  search: string,
  currentPage: number
): Promise<Response> => {
  try {
    const url = `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=ko-KR&page=${currentPage}`;
    const response = await fetch(url, OPTIONS);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return { status: "success", data: data };
  } catch (error) {
    console.error("검색 데이터 로드 실패:", error);
    return { status: "fail", data: [] };
  }
};
