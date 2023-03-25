export const MOVIE_COUNT_IN_ONE_PAGE = 20;

export const API = {
  URL: "https://api.themoviedb.org/3/",
  LANGUAGE: "ko",
};

export const PATH = {
  POPULAR_MOVIE: "movie/popular",
  SEARCHED_MOVIE: "search/movie",
};

export const RATING_MESSAGES: Record<string, string> = {
  "0": "별점 미등록",
  "2": "최악이에요",
  "4": "별로예요",
  "6": "보통이에요",
  "8": "재밌어요",
  "10": "명작이에요",
};

export const NO_OVERVIEW = "영화사에서 제공받은 줄거리가 없습니다.";
