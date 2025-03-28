const MOVIE_COUNT = {
  UNIT: 20,
  MAX_PAGE: 500,
} as const;

const ERROR_MESSAGES = {
  NO_RESULT: "검색 결과가 없습니다.",
  MOVIE_FETCH_FAILED:
    "영화 정보를 불러오는 데 실패했습니다. 새로고침 해 주세요.",
} as const;

const SCORE_MESSAGES = {
  2: "최악이예요",
  4: "별로예요",
  6: "보통이에요",
  8: "재미있어요",
  10: "명작이에요",
} as const;

export { ERROR_MESSAGES, MOVIE_COUNT, SCORE_MESSAGES };
