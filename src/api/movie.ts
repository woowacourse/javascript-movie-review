export const MOVIE_POPULAR_API = (pageNumber: number) =>
  `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=ko-KR&page=${pageNumber}`;

export const MOVIE_SEARCH_API = (query: string, pageNumber: number) =>
  `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=ko-KR&query=${query}&page=${pageNumber}&include_adult=false`;
