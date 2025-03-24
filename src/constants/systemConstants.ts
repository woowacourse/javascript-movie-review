export const APP_CONFIG = {
  BASE_PATH: '/javascript-movie-review',
};

export const ASSET_PATHS = {
  IMAGE_BASE: 'https://image.tmdb.org/t/p/w500',
};

export const MOVIE_API = {
  getSearchUrl: (query: string, page: number) =>
    `https://api.themoviedb.org/3/search/movie?query=${query}&language=ko-KR&include_adult=false&page=${page}`,
  getPopularUrl: (page: number) =>
    `https://api.themoviedb.org/3/movie/popular?language=ko-KR&include_adult=false&page=${page}`,
};
