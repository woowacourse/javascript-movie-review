import { TMDB_TOKEN, BASE_URL, OPTION } from "../constants/api.ts";
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
    const url = `${BASE_URL}/movie/popular?language=${OPTION.language}&region=${OPTION.region}&page=${pageNumber}`;
    return GETWithAuth(url);
  },

  getSearchData(pageNumber: number, query: string) {
    const url = `${BASE_URL}/search/movie?language=${OPTION.language}&region=${OPTION.region}&page=${pageNumber}&query=${query}`;
    return GETWithAuth(url);
  },
};

export default api;
