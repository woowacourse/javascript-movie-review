export const API_KEY = process.env.TMDB_API_KEY;

export const ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;

export const BASE_URL = "https://api.themoviedb.org/3";

export const IMAGE_URL = "https://image.tmdb.org/t/p/";

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
};

export const endpoint = {
  popularMoive: (page: number) => `movie/popular?language=ko&page=${page}`,
  searchMovie: (title: string, page: number) =>
    `search/movie?query=${title}}&include_adult=false&language=ko&page=${page}`,
};
