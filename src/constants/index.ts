export const REQUEST_MOVIES = {
  POPULARITY: 'popularity',
  SEARCH: 'search',
};

export const UPDATE_TYPE = {
  OVERWRITE: 'overwrite',
  APPEND: 'append',
};

export const IMAGE_URL = {
  BASE: 'https://image.tmdb.org/t/p/original',
  ALTERNATIVE: './assets/no_image.png',
  NO_RESULT: './assets/no_result.png',
  ERROR_RESULT: './assets/error_result.png',
  STAR_EMPTY: './assets/star_empty.png',
  STAR_FILLED: './assets/star_filled.png',
};

export const API_URL = {
  BASE: 'https://api.themoviedb.org/3/',
  POPULAR_MOVIES: (currentPage: number) => {
    return `movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=${currentPage}&include_adult=false`;
  },
  SEARCH_MOVIES: (currentPage: number, keyword: string) => {
    return `search/movie?api_key=${process.env.API_KEY}&language=en-US&query=${keyword}&page=${currentPage}&include_adult=false`;
  },
  MOVIE_DETAIL: (movieId: number) => {
    return `movie/${movieId}?api_key=${process.env.API_KEY}&language=en-US`;
  },
};

export const MOVIE_LIST_TITLE = {
  POPULARITY: 'Popular movies',
  SEARCH: (keyword: string) => `Search Results of "${keyword}"`,
};

export const STAR_RATING = {
  PER_SCORE: 2,
  CAPTION: ['Please Rate', 'Worst', 'Not good', 'Average', 'Fun', 'Masterpiece'],
};

export const CAPTION = {
  LAST_PAGE: 'There are no more movies to load.',
};
