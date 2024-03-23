export const API_KEY = process.env.TMDB_API_KEY;

export const ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;

export const BASE_URL = 'https://api.themoviedb.org/3';

export const IMAGE_URL = 'https://image.tmdb.org/t/p/';

export const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
};

const getPopularMovieURLParams = (page: number) =>
  new URLSearchParams({
    language: 'ko',
    page: page.toString(),
  });

const getSearchMovieURLParams = (title: string, page: number) =>
  new URLSearchParams({
    query: title,
    include_adult: 'false',
    language: 'ko',
    page: page.toString(),
  });

export const endPoint = {
  popularMovie: (page: number) =>
    `movie/popular?${getPopularMovieURLParams(page)}`,
  searchMovie: (title: string, page: number) =>
    `search/movie?${getSearchMovieURLParams(title, page)}`,
};
