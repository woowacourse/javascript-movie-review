export const BASE_URL = 'https://api.themoviedb.org/3/';

export const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/';

export const BASE_IMAGE_WIDTH = 'w500';

export const API_ENDPOINT = Object.freeze({
  POPULAR: (pageNumber: number = 1) => `${BASE_URL}movie/popular?language=ko-kr&page=${pageNumber}`,
});

export const API_OPTION = {
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.API_ACCESS_TOKEN}`,
  },
};