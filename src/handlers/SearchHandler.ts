import MovieListHandler from './MovieListHandler.js';

export default class SearchHandler {
  private query: string;
  constructor(private movieListHandler: MovieListHandler) {
    this.query = '';
  }

  async handleSearch(query: string) {
    this.query = query;
    await this.movieListHandler.initMovieList(query);
  }

  async handleReadMore(query: string) {
    await this.movieListHandler.handleLoadMore(query);
  }
}
