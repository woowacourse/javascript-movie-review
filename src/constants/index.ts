const MOVIE_MAX_COUNT = 20;

const POSTER_BASE_URL = "https://www.themoviedb.org/t/p/original";
const API_BASE_URL = "https://api.themoviedb.org/3/";

const SCORE_COMMENT: { [key: number]: string } = {
  0: "별점을 매겨주세요",
  2: "최악이예요",
  4: "별로예요",
  6: "보통이에요",
  8: "재미있어요",
  10: "명작이에요",
};

export { POSTER_BASE_URL, API_BASE_URL, MOVIE_MAX_COUNT, SCORE_COMMENT };
