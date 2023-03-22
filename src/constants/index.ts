const MOVIE_MAX_COUNT = 20;

const POSTER_BASE_URL = 'https://www.themoviedb.org/t/p/original';
const API_BASE_URL = 'https://api.themoviedb.org/3/';

const HTTP_STATUS_BAD_REQUEST = 400;
const HTTP_STATUS_INTERNAL_SERVER_ERROR = 500;

const MOVIE_LIST_RESET = 'movieListReset';
const MOVIE_LIST_LOADING = 'movieListLoading';
const MOVIE_LIST_LOADED = 'movieListLoaded';
const MOVIE_LIST_ERROR = 'movieListError';
const MOVIE_RETRIEVED = 'movieRetrieved';
const MOVIE_USER_VOTE_UPDATED = 'movieUserVoteUpdated';

const LOCAL_STORAGE_KEY = 'userMovies';

export {
  POSTER_BASE_URL,
  API_BASE_URL,
  MOVIE_MAX_COUNT,
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
  MOVIE_LIST_RESET,
  MOVIE_LIST_LOADING,
  MOVIE_LIST_LOADED,
  MOVIE_LIST_ERROR,
  MOVIE_RETRIEVED,
  MOVIE_USER_VOTE_UPDATED,
  LOCAL_STORAGE_KEY,
};
