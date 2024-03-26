import toast from "../components/toast/toast";
import { BASE_URL, ENDPOINT } from "../constants/constant";
import mapDataToMovies from "../domain/MovieService";

const API_KEY = process.env.API_KEY;

async function fetchMovies(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.status_message);
    }

    return data;
  } catch (error) {
    toast(error.message);
    throw error;
  }
}

export async function fetchPopularMovieList(pageNumber) {
  const popularMovieUrl =
    BASE_URL + ENDPOINT.POPULAR_MOVIES +
    '?' +
    new URLSearchParams({
      api_key: API_KEY,
      language: 'ko-KR',
      page: pageNumber.toString(),
    });

  const popularMovies = await fetchMovies(popularMovieUrl);
  return [mapDataToMovies(popularMovies), popularMovies.total_pages];
}

export async function fetchSearchMovieList(inputValue, pageNumber) {
  const searchMovieUrl =
    BASE_URL + ENDPOINT.MOVIE_SEARCH +
    '?' +
    new URLSearchParams({
      query: inputValue,
      api_key: API_KEY,
      language: 'ko-KR',
      page: pageNumber.toString(),
    });

  const searchMovies = await fetchMovies(searchMovieUrl);
  return [mapDataToMovies(searchMovies), searchMovies.total_pages];
}
