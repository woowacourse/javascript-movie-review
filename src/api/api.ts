import { PaginatedMovies } from "../../types/domain.ts";
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
    if (error instanceof Error) throw new Error(error.message);
  }
};

const api = {
  async getMovieData(pageNumber: number) {
    const url = `https://api.themoviedb.org/3/movie/popular?language=ko-KR&region=KR&page=${pageNumber}`;

    try {
      return (await GETWithAuth(url)) as PaginatedMovies;
    } catch (error) {
      if (error instanceof Error) throw new Error(ERROR.FAIL_CONNECT);
    }
  },

  async getSearchData(pageNumber: number, query: string) {
    const url = `https://api.themoviedb.org/3/search/movie?page=${pageNumber}&query=${query}&language=ko-KR`;

    try {
      return (await GETWithAuth(url)) as PaginatedMovies;
    } catch (error) {
      if (error instanceof Error) throw new Error(ERROR.FAIL_CONNECT);
    }
  },
};

export default api;
