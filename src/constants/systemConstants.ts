export const SYSTEM_CONSTANTS = {
  BASE_API_URL: 'https://api.themoviedb.org/3',
  BASE_IMG_URL: 'https://image.tmdb.org/t/p/w500',
  SEARCH_URL: (searchValue: string, page: number) =>
    `/search/movie?query=${searchValue}&language=ko-KR&include_adult=false&page=${page}`,
  MAIN_URL: (page: number) => `/movie/popular?language=ko-KR&include_adult=false&page=${page}`,
  DETAIL_URL: (id: number) => `/movie/${id}?language=ko-KR`,
} as const;

export const IMAGE_URL = {
  LOGO: `${import.meta.env.BASE_URL}logo.png`,
  WOOWA_LOGO: `${import.meta.env.BASE_URL}woowacourse_logo.png`,
} as const;
