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

const REVIEW_SCORE_MESSAGE = {
  2: '최악이에요',
  4: '별로예요',
  6: '보통이에요',
  8: '재미있어요',
  10: '명작이에요',
};

export { LOCAL_STORAGE_KEY, CUSTOM_EVENT, REVIEW_SCORE_MESSAGE };
