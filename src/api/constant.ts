export const URL = {
  BASE: 'https://api.themoviedb.org/3',
  THUMBNAIL_IMAGE: 'https://image.tmdb.org/t/p/w500',
  ORIGINAL_IMAGE: 'https://image.tmdb.org/t/p/original',
} as const;

export const PATH = {
  MOVIE_POPULAR: '/movie/popular',
  SEARCH_MOVIE: '/search/movie',
  MOVIE_DETAIL: (movie_id: number) => `/movie/${movie_id}`,
} as const;
