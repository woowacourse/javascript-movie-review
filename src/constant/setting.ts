export const LIST_STATE = {
  POPULAR: "popular",
  SEARCHED: "searched",
} as const;

export const LIST_HEADING = (state: ListState, movieName: string) => {
  if (state === LIST_STATE.POPULAR) return "지금 인기 있는 영화";
  if (state === LIST_STATE.SEARCHED)
    return `"${movieName.replace("'", "＇")}" 검색 결과`;
};

export const TOGGLE_SKELETON = {
  SHOW: "show",
  HIDDEN: "hidden",
} as const;

export const SKELETON_REPEAT_TIME = 20;

export const MAX_MOVIE_QUANTITY_PER_PAGE = 20;

export const BREAKPOINT_SMALL = 410;

export const COMMENT: { [key: number]: string } = {
  0: "별점은 매겨주세요.",
  2: "최악이예요",
  4: "별로예요",
  6: "보통이에요",
  8: "재미있어요",
  10: "명작이에요",
};
