export const BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w';

export const ENDPOINT = {
  GET: {
    POPULAR_MOVIES: '/movie/popular',
    MOVIE_SEARCH: '/search/movie',
    MOVIE_DETAIL: (id: number) => `/movie/${id.toString()}`,
  },
};

export const MOVIE_LIST_TYPE = {
  search: {
    type: 'search',
    title: (keyword: string) => `"${keyword}" 검색 결과`,
  },
  popular: {
    type: 'popular',
    title: '지금 인기 있는 영화',
  },
} as const;

export const STORAGE = {
  userMovies: 'userMovies',
} as const;

export const CONFIG = {
  userScoreDecimalPlaces: 1,
} as const;
