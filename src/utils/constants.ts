export const API_KEY = process.env.API_KEY;

export const FetchUrl: Readonly<{ [key: string]: string }> = {
  POPULAR_URL: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=`,
  SEARCH_URL: `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=ko-KR&query=`,
};
