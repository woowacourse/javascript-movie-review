import TMDB from '../api/DB/TMDB';
import renderToast from '../component/toast/toast';
import { MovieServiceType } from './MovieServiceType';

type validAPIName = 'TMDB';

const API_FACTORY: Record<validAPIName, MovieServiceType> = {
  TMDB: TMDB,
};
class MovieService implements MovieServiceType {
  private readonly api;

  constructor(apiName: validAPIName) {
    this.api = API_FACTORY[apiName];
  }

  async fetchPopularMovieList(currentPage: number) {
    try {
      return await this.api.fetchPopularMovieList(currentPage);
    } catch (error) {
      if (error instanceof Error) renderToast(error.message);
      // TODO: null이 아닌 오류 객체를 반환
      return null;
    }
  }

  async fetchSearchResult(props: { query: string; currentPage: number }) {
    try {
      return await this.api.fetchSearchResult(props);
    } catch (error) {
      if (error instanceof Error) renderToast(error.message);
      return null;
    }
  }

  async fetchMovieDetail(movieId: number) {
    try {
      return await this.api.fetchMovieDetail(movieId);
    } catch (error) {
      if (error instanceof Error) renderToast(error.message);
      return null;
    }
  }
}

export default MovieService;
