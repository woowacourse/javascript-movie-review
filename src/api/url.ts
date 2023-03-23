const API_KEY = process.env.API_KEY;

export const URL = {
  GET_POPULAR_MOVIES: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR`,
  GET_SEARCH_MOVIES: `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=ko-KR&include_adult=false`,
  GET_MOVIE_GENRES: `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=ko-KR`,
};
