import api from "./api.ts";
import { OPTION } from "../constants/api.ts";
import { STATUS_MESSAGE } from "../constants/error.ts";

const defaultParams = {
  language: OPTION.language,
  region: OPTION.region,
};

const movieApi = {
  async getMovieData(pageNumber: number) {
    try {
      const params = new URLSearchParams({
        ...defaultParams,
        page: pageNumber.toString(),
      }).toString();

      const endpoint = `/movie/popular?${params}`;
      return api.GETWithAuth(endpoint);
    } catch (error) {
      if (error instanceof Error && error.message in STATUS_MESSAGE) {
        throw new Error(STATUS_MESSAGE[error.message]);
      }
    }
  },

  getSearchData(pageNumber: number, query: string) {
    try {
      const params = new URLSearchParams({
        ...defaultParams,
        page: pageNumber.toString(),
        query,
      }).toString();

      const endpoint = `/search/movie?${params}`;
      return api.GETWithAuth(endpoint);
    } catch (error) {
      if (error instanceof Error && error.message in STATUS_MESSAGE) {
        throw new Error(STATUS_MESSAGE[error.message]);
      }
    }
  },

  getMovieDetailsData(id: number) {
    try {
      const params = new URLSearchParams({
        ...defaultParams,
      }).toString();

      const endpoint = `/movie/${id}?${params}`;
      return api.GETWithAuth(endpoint);
    } catch (error) {
      if (error instanceof Error && error.message in STATUS_MESSAGE) {
        throw new Error(STATUS_MESSAGE[error.message]);
      }
    }
  },
};

export default movieApi;
