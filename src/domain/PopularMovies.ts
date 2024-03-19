import fetchWrapper from '../utils/fetchWrapper';
import { POPULAR_MOVIES } from '../constants/url';
import { ResponseMoviePage } from '../types/ResponseMoviePage';

class PopularMovies {
  private currentPage: number;
  private totalPages: number;

  constructor() {
    this.currentPage = 1;
    this.totalPages = 0;
  }

  async getPopularMovies() {
    const params = new URLSearchParams({
      language: 'ko-kr',
      page: this.currentPage + '',
    });
    const popularMovies = await fetchWrapper<ResponseMoviePage>({
      url: POPULAR_MOVIES + '?' + params,
      accessToken: process.env.ACCESS_TOKEN,
    });

    this.totalPages = popularMovies.total_pages;

    this.currentPage += 1;
    return popularMovies.results;
  }
}
export default PopularMovies;
