type MOVIE_RATE_COMMENT = { [key: number]: string };

export const MOVIE_RATE_LIST_KEY = "movieRateList";
export const MOVIE_RATE_COMMENT: MOVIE_RATE_COMMENT = Object.freeze({
  2: "최악이예요",
  4: "별로예요",
  6: "보통이에요",
  8: "재미있어요",
  10: "명작이에요",
});
export const MOVIE_NO_RATE_COMMENT = "";
export const MOVIE_NO_DESCRIPTION =
  "이런! 아직 영화의 상세정보가 영화 정보 사이트에 등록되지 않았습니다. 🥲";
