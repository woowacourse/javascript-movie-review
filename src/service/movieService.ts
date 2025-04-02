import { UserMovieRateData } from "../../types/data.ts";
import movieApi from "../api/movieApi.ts";
import { KEY } from "../constants/store.ts";
import calculatePageNumber from "../domain/calculatePageNumber.ts";
import {
  extractMovieDetails,
  extractTotalMovies,
} from "../domain/extractData.ts";
import store from "../store/store.ts";

const movieService = {
  async getMovies(totalCount: number) {
    const pageNumber = calculatePageNumber(totalCount);
    const rawData = await movieApi.getMovieData(pageNumber);

    return extractTotalMovies(rawData);
  },

  async searchMovies(totalCount: number, query: string) {
    const pageNumber = calculatePageNumber(totalCount);
    const rawData = await movieApi.getSearchData(pageNumber, query);

    return extractTotalMovies(rawData);
  },

  async getMovieDetail(movieId: number) {
    const rawData = await movieApi.getMovieDetailsData(movieId);

    return extractMovieDetails(rawData);
  },

  getRateList() {
    return JSON.parse(store.getData(KEY.movieList) ?? "[]");
  },

  updateRateById(id: number, newData: UserMovieRateData) {
    const totalMovieRates = this.getRateList();
    const storedMoviesRates = totalMovieRates.filter(
      (data: UserMovieRateData) => {
        return data.id !== id;
      }
    );

    const newMovieList = [...storedMoviesRates, newData];
    const stringifyData = JSON.stringify(newMovieList);

    store.setData(KEY.movieList, stringifyData);
  },

  addRate(data: UserMovieRateData) {
    const totalMovieRates = this.getRateList();
    const newMovieList = [...totalMovieRates, data];
    const stringifyData = JSON.stringify(newMovieList);

    store.setData(KEY.movieList, stringifyData);
  },

  checkHasRated(movieId: number) {
    const totalMovieRates = this.getRateList();
    return (
      totalMovieRates.filter(({ id }: { id: number }) => id === movieId)
        .length > 0
    );
  },
};

export default movieService;
