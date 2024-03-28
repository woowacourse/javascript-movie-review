import toast from '../components/toast/toast';
import { MOVIE_DETAIL, MOVIE_SEARCH_URL, NETWORK_ERROR_MESSAGE, POPULAR_MOVIES_URL } from '../constants/constant';
import { mapDataToMovies, mapDetailDataToMovie } from '../domain/MovieService';
import { MovieAPIResponse, MovieDetailData, MovieList, UrlParams } from '../interface/Movie';

const API_KEY: string | undefined = process.env.API_KEY;

export async function fetchPopularMovieList(pageNumber: number): Promise<MovieAPIResponse> {
  try {
    const popularMovies = await buildData<MovieList>(
      { api_key: API_KEY, language: 'ko-KR', page: pageNumber.toString() } as UrlParams,
      POPULAR_MOVIES_URL,
    );
    console.log(popularMovies);
    return [mapDataToMovies(popularMovies), popularMovies.total_pages, popularMovies.total_results];
  } catch (error) {
    toast(NETWORK_ERROR_MESSAGE);
    return [[], 0, 0];
  }
}

export async function fetchSearchMovieList(inputValue: string, pageNumber: number): Promise<MovieAPIResponse> {
  try {
    const searchMovies = await buildData<MovieList>(
      { query: inputValue, api_key: API_KEY, language: 'ko-KR', page: pageNumber.toString() } as UrlParams,
      MOVIE_SEARCH_URL,
    );
    return [mapDataToMovies(searchMovies), searchMovies.total_pages, searchMovies.total_results];
  } catch (error) {
    toast(NETWORK_ERROR_MESSAGE);
    return [[], 0, 0];
  }
}

export async function fetchMovieDetail(movieId: Number) {
  const movieDetailUrl = MOVIE_DETAIL + movieId;
  const movieDetail = await buildData<MovieDetailData>(
    { api_key: API_KEY, language: 'ko-KR' } as UrlParams,
    movieDetailUrl,
  );

  return mapDetailDataToMovie(movieDetail);
}

async function buildData<T>(urlParams: UrlParams, baseURL: string): Promise<T> {
  const targetMovieUrl = baseURL + '?' + new URLSearchParams(urlParams);
  const response = await fetch(targetMovieUrl);
  if (!response.ok) {
    await response.json();
    throw new Error(NETWORK_ERROR_MESSAGE);
  }
  const jsonData = await response.json();
  return jsonData;
}
