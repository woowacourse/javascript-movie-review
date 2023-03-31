export const PAGE_LENGTH = 20;

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
  UP_SCROLL: "up-scroll",
  DETAIL: "detail",
} as const;

export const REQUEST_URL = "https://api.themoviedb.org/3";

export const SEARCH_WARNING = "검색어를 입력해주세요.";

export const ERROR_MESSAGE =
  "에러가 발생했습니다. 잠시 후에 다시 시도해주세요.";

export const OVERVIEW_EMPTY = "줄거리가 작성되지 않았습니다.";

export const SCROLL_INVOKE_GAP = 150;

export const TITLE = {
  POPULAR: "지금 인기있는 영화",
  SEARCH: "검색결과",
} as const;
