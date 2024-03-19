import fetchWrapper from '../utils/fetchWrapper';
import { MATCHED_MOVIES } from '../constants/url';
import { ResponseMoviePage } from '../types/ResponseMoviePage';

class MatchedMovies {
  private currentPage: number;
  private totalPage: number;

  constructor() {
    this.currentPage = 1;
    this.totalPage = 0;
  }

  async getMatchedMovies(query: string) {
    const params = new URLSearchParams({
      query,
      language: 'ko-kr',
      page: this.currentPage + '',
    });
    const matchedMovies = await fetchWrapper<ResponseMoviePage>({
      url: MATCHED_MOVIES + '?' + params,
      accessToken: process.env.ACCESS_TOKEN,
    });

    this.totalPage = matchedMovies.total_pages;

    this.currentPage += 1;
    return matchedMovies.results;
  }
}

export default MatchedMovies;
