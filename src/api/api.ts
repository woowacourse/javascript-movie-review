import { TMDB_TOKEN } from "../constants/api.ts";
import ERROR from "../constants/error.ts";

const options = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${TMDB_TOKEN}`,
  },
};

const GETWithAuth = async (url: string) => {
  try {
    const response = await fetch(url, options);
    return await response.json();
  } catch (error) {
    if (error instanceof Error) alert(ERROR.FAIL_CONNECT);
  }
};

const api = {
  getMovieData(pageNumber: number) {
    const url = `https://api.themoviedb.org/3/movie/popular?language=ko-KR&region=KR&page=${pageNumber}`;
    return GETWithAuth(url);
  },

  getSearchData(pageNumber: number, query: string) {
    const url = `https://api.themoviedb.org/3/search/movie?page=${pageNumber}&query=${query}&language=ko-KR`;
    return GETWithAuth(url);
  },
};

export default api;
