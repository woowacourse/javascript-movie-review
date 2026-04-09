const PUBLIC_IMAGE_BASE_URL = "./images/";

export const BASE_URL = {
  TMDB_BASE_URL: "https://api.themoviedb.org/3",
  POSTER_BASE_URL: "https://image.tmdb.org/t/p/w200",
  HERO_BASE_URL: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces",
};

export const DEFAULT_LANGUAGE = "ko-KR";

export const SKELETON_MOVIE_COUNT = 20;

export const IMAGE_URL = {
  STAR_IMAGE_URL: `${PUBLIC_IMAGE_BASE_URL}star_empty.png`,
  DEFAULT_THUMBNAIL_IMAGE_URL: `${PUBLIC_IMAGE_BASE_URL}default-thumbnail.jpeg`,
  NO_RESULT_PLANET_IMAGE_URL: `${PUBLIC_IMAGE_BASE_URL}no-result-planet.png`,
};

export const API_PATH = {
  POPULAR_MOVIE: `/movie/popular`,
  SEARCH_MOVIE: `/search/movie`,
};

export const PAGE_TITLE = {
  POPULAR: "지금 인기 있는 영화",
  SEARCH: (query: string) => `"${query}" 검색 결과`,
};
