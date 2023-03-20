const API_KEY = process.env.API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const popularMovieUrl = (page: number) => {
  return `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}&include_adult=false`;
};

export const searchMovieUrl = (query: string, page: number) => {
  return `${BASE_URL}/search/movie?api_key=${API_KEY}&language=ko-KR&query=${query}&page=${page}&include_adult=false`;
};
