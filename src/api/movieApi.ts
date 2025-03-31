import api from "./api.ts";
import { OPTION } from "../constants/api.ts";
import { ERROR, STATUS_MESSAGE } from "../constants/error.ts";
import ErrorUI from "../components/ErrorUI.ts";

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
      return await api.GETWithAuth(endpoint);
    } catch (error) {
      if (error instanceof Error) {
        const status = Number(error.message);
        const message = STATUS_MESSAGE[status] ?? ERROR.DEFAULT;
        const errorUI = new ErrorUI({ status, message });
        errorUI.create();
        errorUI.renderError();
      }
    }
  },

  async getSearchData(pageNumber: number, query: string) {
    try {
      const params = new URLSearchParams({
        ...defaultParams,
        page: pageNumber.toString(),
        query,
      }).toString();

      const endpoint = `/search/movie?${params}`;
      return await api.GETWithAuth(endpoint);
    } catch (error) {
      if (error instanceof Error) {
        const status = Number(error.message);
        const message = STATUS_MESSAGE[status] ?? ERROR.DEFAULT;
        const errorUI = new ErrorUI({ status, message });
        errorUI.create();
        errorUI.renderError();
      }
    }
  },

  async getMovieDetailsData(id: number) {
    try {
      const params = new URLSearchParams({
        ...defaultParams,
      }).toString();

      const endpoint = `/movie/${id}?${params}`;
      return await api.GETWithAuth(endpoint);
    } catch (error) {
      if (error instanceof Error) {
        const status = Number(error.message);
        const message = STATUS_MESSAGE[status] ?? ERROR.DEFAULT;
        const errorUI = new ErrorUI({ status, message });
        errorUI.create();
        errorUI.renderError();
      }
    }
  },
};

export default movieApi;
