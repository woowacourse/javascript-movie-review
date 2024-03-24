import toast from "../components/toast/toast";
import { MOVIE_SEARCH_URL, NETWORK_ERROR_MESSAGE, POPULAR_MOVIES_URL } from "../constants/constant";
import { mapDataToMovies } from "../domain/MovieService";

const API_KEY = process.env.API_KEY;

export async function fetchPopularMovieList(pageNumber) {
  try {
    const popularMovies = await buildData({api_key: API_KEY, language: 'ko-KR', page:pageNumber}, POPULAR_MOVIES_URL);

    return [mapDataToMovies(popularMovies), popularMovies.total_pages];
  } catch (error) {
    toast(error.message);
  }
}

export async function fetchSearchMovieList(inputValue, pageNumber) {
  try {
    const searchMovies = await buildData({query: inputValue, api_key: API_KEY, language: 'ko-KR', page:pageNumber}, MOVIE_SEARCH_URL);
    return [mapDataToMovies(searchMovies), searchMovies.total_pages, searchMovies.total_results];
  } catch (error) {
    toast(error.message);
  }
}

async function buildData(urlParams, baseURL) {
  const targetMovieUrl =
  baseURL +
      '?' +
      new URLSearchParams(urlParams);
  const response = await fetch(targetMovieUrl);
    if(!response.ok){
      await response.json();
      throw new Error(NETWORK_ERROR_MESSAGE);
    }
    const jsonData = await response.json();
    return jsonData;
}
