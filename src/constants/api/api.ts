export const BASE_URL = 'https://api.themoviedb.org/3/';

export const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/';

export const DETAIL_MODAL_IMAGE_URL = 'https://image.tmdb.org/t/p';

export const BASE_IMAGE_WIDTH = 'w500';

export const DETAIL_IMAGE_WIDTH = 'w300';

export const API_ENDPOINT = Object.freeze({
  POPULAR: (pageNumber: number = 1) => `${BASE_URL}movie/popular?language=ko-kr&page=${pageNumber}`,
  SEARCH: (keyword: string, pageNumber: number = 1) =>
    `${BASE_URL}search/movie?api_key=${process.env.API_KEY}&query=${keyword}&page=${pageNumber}&language=ko-kr`,
  ID: (movieId: number) => `${BASE_URL}movie/${movieId}?language=ko-kr`,
  GENRE: `${BASE_URL}genre/movie/list?language=ko`,
});

export const API_OPTION = {
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.API_ACCESS_TOKEN}`,
  },
};

export const API_OPTION_WITH_KEY = {
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.API_KEY}`,
  },
};
