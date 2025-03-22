export const SYSTEM_CONSTANTS = Object.freeze({
  BASE_IMG_URL: 'https://image.tmdb.org/t/p/w500',
  SEARCH_URL: (searchValue: string, page: number) =>
    `https://api.themoviedb.org/3/search/movie?query=${searchValue}&language=ko-KR&include_adult=false&page=${page}`,
  MAIN_URL: (page: number) =>
    `https://api.themoviedb.org/3/movie/popular?language=ko-KR&include_adult=false&page=${page}`,
});

export const IMAGE_URL = Object.freeze({
  LOGO: `${import.meta.env.BASE_URL}logo.png`,
  WOOWA_LOGO: `${import.meta.env.BASE_URL}woowacourse_logo.png`,
});
