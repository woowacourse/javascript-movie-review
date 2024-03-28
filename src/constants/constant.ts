import { ScoreMessage } from '../interface/Movie';

const BASE_URL = 'https://api.themoviedb.org/3';
const POPULAR_MOVIES_URL = `${BASE_URL}/movie/popular`;
const MOVIE_SEARCH_URL = `${BASE_URL}/search/movie`;
const MOVIE_DETAIL = `${BASE_URL}/movie/`;
const LAST_PAGE = 500;

const SCORE_MESSAGE: ScoreMessage = {
  2: '최악이예요',
  4: '별로예요',
  6: '보통이에요',
  8: '재미있어요',
  10: '명작이에요',
};

const NETWORK_ERROR_MESSAGE = '알 수 없는 네트워크 에러가 발생했습니다. 인터넷 연결을 다시 확인해 주세요';

export {
  BASE_URL,
  POPULAR_MOVIES_URL,
  MOVIE_SEARCH_URL,
  MOVIE_DETAIL,
  LAST_PAGE,
  SCORE_MESSAGE,
  NETWORK_ERROR_MESSAGE,
};
