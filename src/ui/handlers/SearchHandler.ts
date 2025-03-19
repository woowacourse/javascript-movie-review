import MovieListHandler from "./MovieListHandler.js";
import MovieList from "../components/MovieList.js";
import MovieService from "../../domain/services/MovieService.js";

export default class SearchHandler {
  constructor(private movieService: MovieService) {}

  async handleSearch(query: string) {
    const searchResults = await this.movieService.searchMovies(query, 1);
    MovieList.removeMovieList();
    const movieList = new MovieList(
      ".thumbnail-list",
      searchResults.movies,
      searchResults.page,
      searchResults.totalPages,
      this.movieService
    );
    movieList.init();
  }
}
