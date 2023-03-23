export const MOVIES_PER_PAGE = 20;

export const STATUS = {
  LOADING: "loading",
  SUCCESS: "success",
  NO_RESULT: "no-result",
} as const;

export const ACTION = {
  MORE_POPULAR: "more_popular",
  MORE_SEARCH: "more_search",
  POPULAR: "popular",
  SEARCH: "search",
  HIDE_SEARCH: "hide_search",
  ON_SEARCH: "search_on",
} as const;

export const REQUEST_URL = "https://api.themoviedb.org/3";

export const TITLE = {
  POPULAR: "지금 인기있는 영화",
  SEARCH: "검색결과",
} as const;

export const ANIMATED_TIME = {
  MODAL: 500,
};

export const ROUTER = {
  MOVIE_DETAIL: "movie",
};
