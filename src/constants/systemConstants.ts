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

export const GENRE_MAP: Record<number, string> = {
  28: '액션',
  12: '모험',
  16: '애니메이션',
  35: '코미디',
  80: '범죄',
  99: '다큐멘터리',
  18: '드라마',
  10751: '가족',
  14: '판타지',
  36: '역사',
  27: '공포',
  10402: '음악',
  9648: '미스터리',
  10749: '로맨스',
  878: 'SF',
  10770: 'TV 영화',
  53: '스릴러',
  10752: '전쟁',
  37: '서부',
};
