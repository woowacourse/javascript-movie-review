import ToastPopup from '../../components/ToastPopup/ToastPopup';
import { POPULAR_MOVIES_URL, MOVIE_SEARCH_URL } from '../../constants/URLs';
import ResponseValidator from '../Validator/ResponseValidator';

async function fetchPopularMovies(page: number) {
  const KEY = process.env.API_KEY;
  const popularMovieUrl =
    POPULAR_MOVIES_URL +
    '?' +
    new URLSearchParams({
      api_key: KEY as string,
      language: 'ko-KR',
      page: `${page}`,
    });

  try {
    const response = await fetch(popularMovieUrl);
    ResponseValidator(response);
    const popularMovies = await response.json();
    return popularMovies;
  } catch (error) {
    ToastPopup(`${error}`, 5000);
  }
}

async function fetchSearchMovies(page: number, userInput: string) {
  const KEY = process.env.API_KEY;
  const movieSearchUrl =
    MOVIE_SEARCH_URL +
    '?' +
    new URLSearchParams({
      api_key: KEY as string,
      query: userInput,
      language: 'ko-KR',
      page: `${page}`,
    });

  try {
    const response = await fetch(movieSearchUrl);
    ResponseValidator(response);
    const popularMovies = await response.json();
    return popularMovies;
  } catch (error) {
    ToastPopup(`${error}`, 5000);
  }
}

export { fetchPopularMovies, fetchSearchMovies };
