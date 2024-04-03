import { MOVIE_DETAIL_BASE_URL, MOVIE_SEARCH_BASE_URL, POPULAR_MOVIES_BASE_URL } from '../../../constants/MOVIES_URL';
import generateMoviesUrl from '../../../utils/generateMoviesUrl';

async function fetchPopularMovies(page: number) {
  const popularMoviesURL = generateMoviesUrl(POPULAR_MOVIES_BASE_URL, { page: String(page) });
  const response = await fetch(popularMoviesURL);

  return await response.json();
}

async function fetchSearchMovies(page: number, userInput: string) {
  const movieSearchUrl = generateMoviesUrl(MOVIE_SEARCH_BASE_URL, { query: userInput, page: String(page) });
  const response = await fetch(movieSearchUrl);

  return await response.json();
}

async function fetchMovieDetail(id: number) {
  const movieDetailUrl = generateMoviesUrl(`${MOVIE_DETAIL_BASE_URL}${id}?`);
  const response = await fetch(movieDetailUrl);

  return await response.json();
}

export { fetchPopularMovies, fetchSearchMovies, fetchMovieDetail };
