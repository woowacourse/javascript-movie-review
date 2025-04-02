import APIClient from './API/APIClient';
import { SYSTEM_CONSTANTS } from '../constants/systemConstants';
import { Movie } from '../../types/apiMovie';
import { redirectToPage } from '../route/router';
import { convertToMovieData, convertToMovieDetailData } from './API/converToData';

class MovieClient extends APIClient {
  constructor() {
    super(SYSTEM_CONSTANTS.BASE_API_URL);
  }

  async getPopulareMovies(page: number) {
    try {
      const movieList = await this.get(SYSTEM_CONSTANTS.MAIN_URL(page));
      const movieListData = movieList.results.map((movie: Movie) => convertToMovieData(movie));
      return { movieListData, totalPage: movieList.total_pages };
    } catch (error) {
      redirectToPage('/error');
      throw error;
    }
  }

  async getSearchedMovies(query: string, page: number) {
    try {
      const movieList = await this.get(SYSTEM_CONSTANTS.SEARCH_URL(query, page));
      const movieListData = movieList.results.map((movie: Movie) => convertToMovieData(movie));
      return { movieListData, totalPage: movieList.total_pages };
    } catch (error) {
      redirectToPage('/error');
      throw error;
    }
  }

  async getMovieDetails(id: number) {
    try {
      const details = await this.get(SYSTEM_CONSTANTS.DETAIL_URL(id));
      return convertToMovieDetailData(details);
    } catch (error) {
      redirectToPage('/error');
      throw error;
    }
  }
}

export default new MovieClient();
