import movieApi from "../api/movieApi.ts";
import {
  extractMovieDetails,
  extractTotalMovies,
} from "../domain/extractData.ts";

const movieService = {
  async getMovies(pageNumber: number) {
    const rawData = await movieApi.getMovieData(pageNumber);

    return extractTotalMovies(rawData);
  },

  async searchMovies(pageNumber: number, query: string) {
    const rawData = await movieApi.getSearchData(pageNumber, query);

    return extractTotalMovies(rawData);
  },

  async getMovieDetail(movieId: number) {
    const rawData = await movieApi.getMovieDetailsData(movieId);

    return extractMovieDetails(rawData);
  },
};

export default movieService;
