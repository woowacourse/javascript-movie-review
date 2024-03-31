const API = {
  URL: 'https://api.themoviedb.org/3/',
  LANGUAGE: 'ko-KR',
};

const PATH = {
  POPULAR_MOVIE: 'movie/popular',
  SEARCHED_MOVIE: 'search/movie',
  DETAIL_MOVIE_INFO: 'movie',
};

const RATING_MESSAGES: Record<string, string> = {
  '0': '별점 미등록',
  '2': '최악이에요',
  '4': '별로예요',
  '6': '보통이에요',
  '8': '재밌어요',
  '10': '명작이에요',
};

const VIEW_TYPE = {
  POPULAR: 'popular',
  SEARCH: 'search',
};

const LAST_PAGE = 500;

const LOCALSTORAGE_KEY = {
  USER_MOVIES: 'userMovies',
};

export { API, PATH, RATING_MESSAGES, VIEW_TYPE, LAST_PAGE, LOCALSTORAGE_KEY };
