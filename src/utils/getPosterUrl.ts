import { POSTER_PATH } from "../constants/imagePaths";

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

const POSTER_SIZES = {
  SMALL: "w154",
  MEDIUM: "w185",
  LARGE: "w342",
  X_LARGE: "w500",
  MOVIE_DETAIL: "w440_and_h660_face",
  ORIGINAL: "original",
} as const;

type PosterSize = (typeof POSTER_SIZES)[keyof typeof POSTER_SIZES];

export const getPosterUrl = (
  posterPath: string | null,
  size: PosterSize = POSTER_SIZES.MOVIE_DETAIL
): string => {
  if (!posterPath) return POSTER_PATH.DEFAULT;
  return `${TMDB_IMAGE_BASE_URL}/${size}${posterPath}`;
};
