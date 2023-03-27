const API_KEY = process.env.API_KEY;

const BASE_URL = "https://api.themoviedb.org";

export const URL = {
  GET_POPULAR_MOVIES: `${BASE_URL}/3/movie/popular?api_key=${API_KEY}&language=ko-KR`,
  GET_SEARCH_MOVIES: `${BASE_URL}/3/search/movie?api_key=${API_KEY}&language=ko-KR&include_adult=false`,
  GET_MOVIE_GENRES: `${BASE_URL}/3/genre/movie/list?api_key=${API_KEY}&language=ko-KR`,
};
