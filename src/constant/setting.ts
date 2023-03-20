export const LIST_STATE = {
  POPULAR: "popular",
  SEARCHED: "searched",
} as const;

export const LIST_HEADING = (state: listState, movieName: string) => {
  if (state === LIST_STATE.POPULAR) return "지금 인기 있는 영화";
  if (state === LIST_STATE.SEARCHED) return `"${movieName}" 검색 결과`;
};

export const TOGGLE_SKELETON = {
  SHOW: "show",
  HIDDEN: "hidden",
} as const;

export const SKELETON_REPEAT_TIME = 20;

export const MAX_MOVIE_QUANTITY_PER_PAGE = 20;
