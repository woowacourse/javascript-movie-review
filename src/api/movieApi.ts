import api from "./api.ts";
import { OPTION } from "../constants/api.ts";

const defaultParams = {
  language: OPTION.language,
  region: OPTION.region,
};

const movieApi = {
  getMovieData(pageNumber: number) {
    const params = new URLSearchParams({
      ...defaultParams,
      page: pageNumber.toString(),
    }).toString();

    const endpoint = `/movie/popular?${params}`;
    return api.GETWithAuth(endpoint);
  },

  getSearchData(pageNumber: number, query: string) {
    const params = new URLSearchParams({
      ...defaultParams,
      page: pageNumber.toString(),
      query,
    }).toString();

    const endpoint = `/search/movie?${params}`;
    return api.GETWithAuth(endpoint);
  },
};

export default movieApi;
