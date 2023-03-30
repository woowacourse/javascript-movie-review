const LOCAL_STORAGE_KEY = {
  APP: 'woowa_movie-review-app',
};

const CUSTOM_EVENT = {
  RENDER_MOVIES: 'renderMovies',
  UPDATE_MOVIE_LIST_TITLE: 'updateMovieListTitle',
  UPDATE_REVIEW_SCORE: 'updateReviewScore',
  SHOW_MOVIE_DETAIL: 'showMovieDetail',
  RENDER_MORE_MOVIES: 'renderMoreMovies',
};

const ERROR_MESSAGE = {
  SESSION_EXPIRE: '세션이 만료되었습니다.',
  SERVICE_OFFLINE: '서비스는 일시적으로 오프라인 상태입니다.',
  SERVER_PROBLEM: '서버에 문제가 발생했습니다.',
  OVER_REQUEST_TIME: '요청시간이 초과되었습니다.',
  UNKNOWN: '알 수 없는 오류입니다.',
};

const REVIEW_SCORE_MESSAGE = {
  2: '최악이에요',
  4: '별로예요',
  6: '보통이에요',
  8: '재미있어요',
  10: '명작이에요',
};

export { LOCAL_STORAGE_KEY, CUSTOM_EVENT, ERROR_MESSAGE, REVIEW_SCORE_MESSAGE };
