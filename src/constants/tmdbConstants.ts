const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3';

const IMAGE_SIZE = '500';

export const MOVIE_IMAGE_BASE_URL = `https://image.tmdb.org/t/p/w${IMAGE_SIZE}`;

export const POPULAR_MOVIES_URL = `${TMDB_API_BASE_URL}/movie/popular`;

export const SEARCH_MOVIES_URL = `${TMDB_API_BASE_URL}/search/movie`;

export const MOVIE_DETAIL_URL = `${TMDB_API_BASE_URL}/movie`;
