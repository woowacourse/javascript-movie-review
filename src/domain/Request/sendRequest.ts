import ToastPopup from '../../components/ToastPopup/ToastPopup';
import { POPULAR_MOVIES_URL, MOVIE_SEARCH_URL } from '../../constants/URLs';

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
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const popularMovies = await response.json();
    return popularMovies;
  } catch (error) {
    ToastPopup(`인기 영화를 불러오는 도중 오류가 발생했습니다. ${error}`);
    console.error('fetchPopularMovies 오류:', error);
    return null;
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
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const popularMovies = await response.json();
    return popularMovies;
  } catch (error) {
    ToastPopup(`영화 검색 결과를 불러오는 도중 오류가 발생했습니다. ${error}`);
    console.error('fetchSearchMovies 오류:', error);
    return null;
  }
}

export { fetchPopularMovies, fetchSearchMovies };
