import { Movie } from "../../types/responseType/responseType";
import { MovieDetail } from "../apis/movies/useGetMovieDetail";
import { reRender } from "../utils/Core";

export let currentPage = 1; // 현재 페이지 추적
export let movies: Movie[] = []; //전체 영화 리스트
export let searchInputValue: string = ""; // 검색어
export let searchResults: Movie[] = []; // 검색 결과
export let totalResults: number = 0; // 검색 결과 총 개수

export let isLoading = true; //로딩 상태

export let isMoreError = false; // 더보기 에러 상태
export let isError = false; // 에러 상태
export let isSearchError = false; // 검색 에러 상태

export let selectedMovieId: string | null = null; // 선택된 영화

export let movieDetail: MovieDetail | null = null; // 선택된 영화 상세 정보

export let isOpenModal = false; // 모달 열림 여부

export const setMovies = (newMovies: Movie[]) => {
  movies = newMovies;
  reRender();
};

export const setSearchInputValue = (value: string) => {
  searchInputValue = value;
  reRender();
};

export const setSearchResults = (results: Movie[]) => {
  searchResults = results;
  reRender();
};

export const setTotalResults = (total: number) => {
  totalResults = total;
  reRender();
};

export const appendMovies = (newMovies: Movie[]) => {
  movies = [...movies, ...newMovies];
  currentPage += 1;
  reRender();
};

export const appendSearchResults = (newResults: Movie[]) => {
  searchResults = [...searchResults, ...newResults];
  currentPage += 1;
  reRender();
};

export const resetPage = () => {
  currentPage = 1;
};

export const setIsLoading = (value: boolean) => {
  isLoading = value;
  reRender();
};

export const setIsError = (value: boolean) => {
  isError = value;
  reRender();
};

export const setIsMoreError = (value: boolean) => {
  isMoreError = value;
  reRender();
};

export const setIsSearchError = (value: boolean) => {
  isSearchError = value;
  reRender();
};

export const setSelectedMovieId = (movieId: string) => {
  selectedMovieId = movieId;
  reRender();
};

export const setMovieDetail = (detail: MovieDetail) => {
  movieDetail = detail;
  reRender();
};

export const setIsOpenModal = (value: boolean) => {
  isOpenModal = value;
  reRender();
};
