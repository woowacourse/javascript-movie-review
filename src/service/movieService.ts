import { UserMovieRateData } from "../api/types.ts";
import movieApi from "../api/movieApi.ts";
import { KEY } from "../constants/storage.ts";
import calculatePageNumber from "../domain/calculatePageNumber.ts";
import {
  extractMovieDetails,
  extractTotalMovies,
} from "../domain/extractData.ts";
import { calculateFilledStar } from "../domain/ratingMovie.ts";
import storage from "../storage/storage.ts";

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
    const movieRate = this.getRateById(movieId) ?? { id: movieId, rate: 0 };

    return extractMovieDetails(rawData, movieRate);
  },

  getRateList() {
    const rate = storage.getData(KEY.movieList);
    return rate;
  },

  getRateById(movieId: number) {
    const totalMovieRates = this.getRateList();
    const targetRate = totalMovieRates.find(({ id }: { id: number }) => {
      return id === movieId;
    });

    return targetRate ?? null;
  },

  updateRateById(id: number, newData: UserMovieRateData) {
    const totalMovieRates = this.getRateList();
    const storedMoviesRates = totalMovieRates.filter(
      (data: UserMovieRateData) => {
        return data.id !== id;
      }
    );

    const newMovieList = [...storedMoviesRates, newData];

    storage.setData(KEY.movieList, newMovieList);
  },

  addRate(data: UserMovieRateData) {
    const totalMovieRates = this.getRateList();
    const newMovieList = [...totalMovieRates, data];

    storage.setData(KEY.movieList, newMovieList);
  },

  checkHasRated(movieId: number) {
    const totalMovieRates = this.getRateList();
    return (
      totalMovieRates.filter(({ id }: { id: number }) => id === movieId)
        .length > 0
    );
  },

  getRateStars(rate: number) {
    return calculateFilledStar(rate);
  },
};

export default movieService;
