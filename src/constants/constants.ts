const BASE_URL = "https://api.themoviedb.org/3";

export const SEARCH_MOVIE_URL = `${BASE_URL}/search/movie`;
export const POPULAR_MOVIE_URL = `${BASE_URL}/movie/popular`;
export const DETAIL_MOVIE_URL = `${BASE_URL}/movie`;
export const MOVIE_API_PARAMS = {
  ADULT_CONTENT: "include_adult=false",
  LANGUAGE: "language=ko-KR",
};

export const STAR_COMMENT = {
  2: "최악이에요",
  4: "별로에요",
  6: "보통이에요",
  8: "재미있어요",
  10: "명작이에요",
};

export const MOVIE_COUNT = 20;

export const IMG_PATH = `https://image.tmdb.org/t/p`;
