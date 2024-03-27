import ToastPopup from '../../components/ToastPopup/ToastPopup';
import { POPULAR_MOVIES_URL, MOVIE_SEARCH_URL } from '../../constants/URLs';
import { getDomElement } from '../../util/DOM';
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
    ToastPopup(`${error}`, 10000000);
    const toastMessage = getDomElement('#toast_message');
    toastMessage.setAttribute('hover', 'true');
    toastMessage.style.cursor = 'pointer';
    toastMessage.onclick = () => {
      window.open('https://github.com/greetings1012/javascript-movie-review');
    };
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
