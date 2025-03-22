export const SYSTEM_CONSTANTS = Object.freeze({
  BASE_IMG_URL: 'https://image.tmdb.org/t/p/w500',
  SEARCH_URL: (searchValue: string, page: number) =>
    `https://api.themoviedb.org/3/search/movie?query=${searchValue}&language=ko-KR&include_adult=false&page=${page}`,
  MAIN_URL: (page: number) =>
    `https://api.themoviedb.org/3/movie/popular?language=ko-KR&include_adult=false&page=${page}`,
});

export const IMAGE_URL = Object.freeze({
  LOGO: 'https://h0ngju.github.io/javascript-movie-review/logo.png',
  WOOWA_LOGO: 'https://h0ngju.github.io/javascript-movie-review/woowacourse_logo.png',
});
