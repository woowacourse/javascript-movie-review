const BASE_URL = "https://api.themoviedb.org/3";

export const SEARCH_MOVIE_URL = `${BASE_URL}/search/movie`;
export const POPULAR_MOVIE_URL = `${BASE_URL}/movie/popular`;
export const MOVIE_API_PARAMS = {
  ADULT_CONTENT: "include_adult=false",
  LANGUAGE: "language=ko-KR",
};

export const IMG_PATH = `https://image.tmdb.org/t/p`;
