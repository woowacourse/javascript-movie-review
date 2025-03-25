import { MovieResponse } from "../../types/movie.ts";
import SkeletonMovieItem from "../components/movie/SkeletonMovieItem.ts";
import { $, $$ } from "./dom.ts";

const OPTIONS = {
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    accept: "application/json",
  },
};

const showSkeleton = (count: number = 20) => {
  const container = $(".thumbnail-list");
  if (!container) return;

  for (let i = 0; i < count; i++) {
    container.appendChild(SkeletonMovieItem());
  }
};

const hideSkeleton = () => {
  $$(".skeleton")?.forEach((s) => s.remove());
};

export const fetchPopularMovieList = async (
  currentPage: number
): Promise<MovieResponse> => {
  showSkeleton();

  try {
    const url = `https://api.themoviedb.org/3/movie/popular?include_adult=false&language=ko-KR&page=${currentPage}`;
    const response = await fetch(url, OPTIONS);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    hideSkeleton();
    return data;
  } catch (error) {
    console.error("데이터 로드 실패:", error);
    hideSkeleton();
    throw error;
  }
};

export const fetchSearchMovieList = async (
  search: string,
  currentPage: number
): Promise<MovieResponse> => {
  showSkeleton();

  try {
    const url = `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=ko-KR&page=${currentPage}`;
    const response = await fetch(url, OPTIONS);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    hideSkeleton();
    return data;
  } catch (error) {
    console.error("검색 데이터 로드 실패:", error);
    hideSkeleton();
    throw error;
  }
};

export const fetchMovieDetails = async (movieId: number) => {
  try {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`;
    const response = await fetch(url, OPTIONS);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    // hideSkeleton();
    return data;
  } catch (error) {
    console.error("데이터 로드 실패:", error);
    // hideSkeleton();
    throw error;
  }
};
