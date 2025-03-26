export const MAX_MOVIE_PAGE = 500;

export const PREFIX_POSTER_PATH =
  "https://media.themoviedb.org/t/p/w440_and_h660_face/";

export const DEFAULT_MOVIE_DATA = Object.freeze({
  posterPath: "./images/default_thumbnail.jpeg",
  title: "Non Title",
  voteAverage: 0,
  overview: "Non Content",
  genreIds: [28, 12, 16], // 액션, 모험, 애니메이션
});
