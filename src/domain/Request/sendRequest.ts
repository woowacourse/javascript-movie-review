import ToastPopup from '../../components/ToastPopup/ToastPopup';
import { POPULAR_MOVIES_URL, MOVIE_SEARCH_URL } from '../../constants/URLs';
import IRespondData from '../../interfaces/FetchMovieListDTO';
import { getDomElement } from '../../util/DOM';
import checkNetworkStatus from '../Validator/NetworkValidator';

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
    return await requestMovieData(popularMovieUrl);
  } catch (error) {
    ToastPopup(`${error}`, 10000);
    getDomElement('.list-end').remove();
    throw new Error();
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
    return await requestMovieData(movieSearchUrl);
  } catch (error) {
    ToastPopup(`${error}`, 10000);
    getDomElement('.list-end').remove();
    throw new Error();
  }
}

async function requestMovieData(url: string): Promise<IRespondData> {
  const isOnline = await checkNetworkStatus();
  if (!isOnline) {
    throw new Error('네트워크 연결이 없습니다.');
  }

  const response = await fetch(url);
  if (response.status === 401) {
    const toastMessage = getDomElement('#toast_message');
    toastMessage.setAttribute('hover', 'true');
    toastMessage.style.cursor = 'pointer';
    toastMessage.onclick = () => {
      window.open('https://github.com/greetings1012/javascript-movie-review');
    };
    throw new Error('API KEY 검증에 실패했습니다. 클릭하면 개발자의 Github로 이동합니다.');
  }

  const popularMovies = await response.json();
  return popularMovies;
}

export { fetchPopularMovies, fetchSearchMovies };
