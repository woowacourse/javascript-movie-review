import { reRender } from "../utils/Core";

export let currentPage = 1; // 현재 페이지 추적
export let movies: any[] = []; //전체 영화 리스트
export let searchInputValue: string = ""; // 검색어
export let searchResults: any[] = []; // 검색 결과
export let totalResults: number = 0; // 검색 결과 총 개수

export const setMovies = (newMovies: any[]) => {
  movies = newMovies;
  reRender();
};

export const setSearchInputValue = (value: string) => {
  searchInputValue = value;
  reRender();
};

export const setSearchResults = (results: any[]) => {
  searchResults = results;
  reRender();
};

export const setTotalResults = (total: number) => {
  totalResults = total;
  reRender();
};

export const appendMovies = (newMovies: any[]) => {
  movies = [...movies, ...newMovies];
  currentPage += 1;
  reRender();
};

export const appendSearchResults = (newResults: any[]) => {
  searchResults = [...searchResults, ...newResults];
  currentPage += 1;
  reRender();
};

export const resetPage = () => {
  currentPage = 1;
};
