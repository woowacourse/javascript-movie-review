const params = new URLSearchParams({
  language: 'ko-KR',
  api_key: `${process.env.API_KEY}`,
});

export const URL = {
  POPULAR_MOVIES: `https://api.themoviedb.org/3/movie/popular?${params.toString()}`,
  SEARCH_MOVIES: `https://api.themoviedb.org/3/search/movie?${params.toString()}`,
  GENRE: `https://api.themoviedb.org/3/genre/movie/list?${params.toString()}`,
};
