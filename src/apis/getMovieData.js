import ApiClient from './apiClient';
import { PATH } from "../constants/constant";
import {mapDataToMovies, mapDataToMovieDetail} from "../utils/dataMapper";

// 인기 영화 목록
export async function fetchPopularMovieList(pageNumber) {
  const responseData = await ApiClient.get(PATH.POPULAR_MOVIE, {page: pageNumber.toString()});
  return [mapDataToMovies(responseData), responseData.total_pages];
}

// 검색 영화 목록
export async function fetchSearchMovieList(inputValue, pageNumber) {
  const responseData = await ApiClient.get(PATH.SEARCHED_MOVIE, { query: inputValue, page: pageNumber.toString()});
  return [mapDataToMovies(responseData), responseData.total_pages];
}

// 영화 상세 정보
export async function fetchMovieDetail(movieId) {
  const responseData = await ApiClient.get(PATH.DETAIL_MOVIE_INFO + `/${movieId}`);
  return mapDataToMovieDetail(responseData);
}
