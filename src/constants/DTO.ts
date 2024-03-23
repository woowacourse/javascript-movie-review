const BASE_URL = 'https://api.themoviedb.org/3';
const POPULAR_MOVIES_BASE_URL = `${BASE_URL}/movie/popular?`;
const MOVIE_SEARCH_BASE_URL = `${BASE_URL}/search/movie?`;
const MOVIE_POSTER_URL = 'https://image.tmdb.org/t/p/w220_and_h330_face';

const KEY = process.env.API_KEY;

export { POPULAR_MOVIES_BASE_URL, MOVIE_SEARCH_BASE_URL, MOVIE_POSTER_URL, KEY };
