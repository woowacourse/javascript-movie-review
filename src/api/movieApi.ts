import api from "./api.ts";
import { OPTION } from "../constants/api.ts";

const defaultParams = {
  language: OPTION.language,
  region: OPTION.region,
};

const movieApi = {
  async getMovieData(pageNumber: number) {
    const params = new URLSearchParams({
      ...defaultParams,
      page: pageNumber.toString(),
    }).toString();

    const endpoint = `/movie/popular?${params}`;
    return await api.GETWithAuth(endpoint);
  },

  async getSearchData(pageNumber: number, query: string) {
    const params = new URLSearchParams({
      ...defaultParams,
      page: pageNumber.toString(),
      query,
    }).toString();

    const endpoint = `/search/movie?${params}`;
    return await api.GETWithAuth(endpoint);
  },

  async getMovieDetailsData(id: number) {
    const params = new URLSearchParams({
      ...defaultParams,
    }).toString();

    const endpoint = `/movie/${id}?${params}`;
    return await api.GETWithAuth(endpoint);
  },
};

export default movieApi;
