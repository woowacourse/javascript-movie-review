const API_KEY = process.env.API_KEY;

export const popularMovieUrl = (page: number) => {
  return `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}&include_adult=false`;
};

export const searchMovieUrl = (query: string, page: number) => {
  return `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=ko-KR&query=${query}&page=${page}&include_adult=false`;
};
