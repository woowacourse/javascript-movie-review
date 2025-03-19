export const SYSTEM_CONSTANTS = Object.freeze({
  BASE_IMG_URL: 'https://image.tmdb.org/t/p/w500',
  SEARCH_URL: (searchValue: string, page: number) =>
    `https://api.themoviedb.org/3/search/movie?api_key=${
      import.meta.env.VITE_API_TOKEN
    }&query=${searchValue}&language=ko-KR&include_adult=false&page=${page}`,
  MAIN_URL: (page: number) =>
    `https://api.themoviedb.org/3/movie/popular?language=ko-KR&include_adult=false&page=${page}`,
});

// todo : 상수에 대한 응집도 높히기
