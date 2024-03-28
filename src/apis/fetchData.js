import { BASE_URL, ENDPOINT } from "../constants/constant";
import {mapDataToMovies, mapDataToMovieDetail} from "../domain/MovieService";
import errorHandler from "../utils/errorHandler";

const API_KEY = process.env.API_KEY;

// 공통으로 사용되는 fetchMovies 함수
async function fetchMovies(url) {
  try {
    window.addEventListener("offline", () => {
      throw new Error('offline');
    });
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.status_message);
    }

    return data;
  } catch (error) {
    errorHandler(error.message)
    throw error;
  }
}

// URL을 생성하는 함수
function buildUrl(endpoint, queryParams = {}) {
  const params = new URLSearchParams({
    api_key: API_KEY,
    language: 'ko-KR',
    ...queryParams
  });

  return `${BASE_URL}${endpoint}?${params}`;
}

// 인기 영화 목록
export async function fetchPopularMovieList(pageNumber) {
  const popularMovieUrl = buildUrl(ENDPOINT.POPULAR_MOVIES, {page: pageNumber.toString()});
  const popularMovies = await fetchMovies(popularMovieUrl);
  return [mapDataToMovies(popularMovies), popularMovies.total_pages];
}

// 검색 영화 목록
export async function fetchSearchMovieList(inputValue, pageNumber) {
  const searchMovieUrl = buildUrl(ENDPOINT.MOVIE_SEARCH, { query: inputValue, page: pageNumber.toString()});
  const searchMovies = await fetchMovies(searchMovieUrl);
  return [mapDataToMovies(searchMovies), searchMovies.total_pages];
}

// 영화 상세 정보
export async function fetchMovieDetail(movieId) {
  const movieDetailUrl = buildUrl(ENDPOINT.DETAIL_MOVIE_INFO + `/${movieId}`);
  const movieDetailInfo = await fetchMovies(movieDetailUrl);
  return mapDataToMovieDetail(movieDetailInfo);
}