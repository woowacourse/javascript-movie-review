// TMDB API 이미지 기본 경로
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

// 이미지 크기 옵션
const POSTER_SIZES = {
  SMALL: "w154",
  MEDIUM: "w185",
  LARGE: "w342",
  X_LARGE: "w500",
  MOVIE_DETAIL: "w440_and_h660_face",
  ORIGINAL: "original",
};

export const POSTER_PATH = Object.freeze({
  DEFAULT: "./default-poster.svg",
  LOADING: "./loading-poster.svg",
  ERROR: "./error-poster.svg",
});

export const ICON_PATH = Object.freeze({
  STAR: "./star_empty.png",
  SEARCH: "./search.svg",
});

export const IMAGE_PATH = Object.freeze({
  EMPTY_PLANET: "./empty-planet.svg",
});

// 포스터 URL 생성 함수
export const getPosterUrl = (
  posterPath: string | null,
  size = POSTER_SIZES.MOVIE_DETAIL
): string => {
  if (!posterPath) return POSTER_PATH.DEFAULT;
  return `${TMDB_IMAGE_BASE_URL}/${size}${posterPath}`;
};
