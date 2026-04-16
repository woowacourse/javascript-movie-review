const TMDB_IMAGE_BASE_URL = "https://media.themoviedb.org/t/p";

type ImageSize =
  | "w1920_and_h800_multi_faces"
  | "w300_and_h450_face"
  | "w220_and_h330_face";

export const getImageUrl = (path: string, size: ImageSize) => {
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};
