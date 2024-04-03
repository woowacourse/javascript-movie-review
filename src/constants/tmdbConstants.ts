const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3';

const IMAGE_SIZE = '500';

export const MOVIE_IMAGE_BASE_URL = `https://image.tmdb.org/t/p/w${IMAGE_SIZE}`;

export const POPULAR_MOVIES_URL = `${TMDB_API_BASE_URL}/movie/popular`;

export const SEARCH_MOVIES_URL = `${TMDB_API_BASE_URL}/search/movie`;

export const MOVIE_DETAIL_URL = `${TMDB_API_BASE_URL}/movie`;

export const RATING_MESSAGES = {
  0: '별점 미등록',
  2: '최악이에요',
  4: '별로예요',
  6: '보통이에요',
  8: '재밌어요',
  10: '명작이에요',
} as const;
