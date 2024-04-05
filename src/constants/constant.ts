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

const SETTING = {
  LAST_PAGE: 500,
  FETCH_ITEM_COUNT: 20,
  STARS_COUNT: 5,
};

const LOCALSTORAGE_KEY = {
  USER_MOVIES: 'userMovies',
};

const EMPTY_CONTENT = {
  GENRES: '장르 없음',
  OVERVIEW: '상세 설명이 없습니다.',
};

export { API, PATH, RATING_MESSAGES, VIEW_TYPE, SETTING, LOCALSTORAGE_KEY, EMPTY_CONTENT };
