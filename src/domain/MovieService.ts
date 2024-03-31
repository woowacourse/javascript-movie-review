import { MovieServiceType } from './MovieServiceType';

class MovieService implements MovieServiceType {
  private readonly api;

  constructor(api: MovieServiceType) {
    this.api = api;
  }

  async fetchPopularMovieList(currentPage: number) {
    return await this.api.fetchPopularMovieList(currentPage);
  }

  async fetchSearchResult(props: { query: string; currentPage: number }) {
    return await this.api.fetchSearchResult(props);
  }

  async fetchMovieDetail(movieId: number) {
    return await this.api.fetchMovieDetail(movieId);
  }
}

export default MovieService;
