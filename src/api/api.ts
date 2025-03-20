import { TMDB_TOKEN } from "../constants/api.ts";
import ERROR from "../constants/error.ts";

const options = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${TMDB_TOKEN}`,
  },
};

const GETWithAuth = async (url: string, errorMessage: string) => {
  try {
    const response = await fetch(url, options);
    return await response.json();
  } catch (error) {
    if (error instanceof Error) alert(errorMessage);
  }
};

const api = {
  async getMovieData(pageNumber: number) {
    const url = `https://api.themoviedb.org/3/movie/popular?language=ko-KR&region=KR&page=${pageNumber}`;
    return GETWithAuth(url, ERROR.FAIL_CONNECT);
  },

  async getSearchData(pageNumber: number, query: string) {
    try {
      const url = `https://api.themoviedb.org/3/search/movie?page=${pageNumber}&query=${query}&language=ko-KR`;
      return GETWithAuth(url, ERROR.FAIL_CONNECT);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  },
};

export default api;
