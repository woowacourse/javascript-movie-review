import MovieListHandler from "./MovieListHandler.js";

export default class SearchHandler {
  constructor(private movieListHandler: MovieListHandler) {}

  async handleSearch(query: string) {
    await this.movieListHandler.initMovieList(query);
  }
}
