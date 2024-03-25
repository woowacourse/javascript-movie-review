import toast from '../components/toast/toast';
import { MOVIE_SEARCH_URL, NETWORK_ERROR_MESSAGE, POPULAR_MOVIES_URL } from '../constants/constant';
import { mapDataToMovies } from '../domain/MovieService';
import { UrlParams } from '../interface/Movie';

const API_KEY: string | undefined = process.env.API_KEY;

export async function fetchPopularMovieList(pageNumber: number) {
  try {
    const popularMovies = await buildData(
      { api_key: API_KEY, language: 'ko-KR', page: pageNumber.toString() } as UrlParams,
      POPULAR_MOVIES_URL,
    );

    return [mapDataToMovies(popularMovies), popularMovies.total_pages];
  } catch (error) {
    toast((error as Error).message);
  }
}

export async function fetchSearchMovieList(inputValue: string, pageNumber: number) {
  try {
    const searchMovies = await buildData(
      { query: inputValue, api_key: API_KEY, language: 'ko-KR', page: pageNumber.toString() } as UrlParams,
      MOVIE_SEARCH_URL,
    );
    return [mapDataToMovies(searchMovies), searchMovies.total_pages, searchMovies.total_results];
  } catch (error) {
    toast((error as Error).message);
  }
}

async function buildData(urlParams: UrlParams, baseURL: string) {
  const targetMovieUrl = baseURL + '?' + new URLSearchParams(urlParams);
  const response = await fetch(targetMovieUrl);
  console.log(response);
  if (!response.ok) {
    await response.json();
    throw new Error(NETWORK_ERROR_MESSAGE);
  }
  const jsonData = await response.json();
  return jsonData;
}
