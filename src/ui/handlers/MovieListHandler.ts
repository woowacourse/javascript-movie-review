import Movie from "../../domain/models/Movie.js";
import MovieList from "../components/MovieList.js";
import MovieService from "../../domain/services/MovieService.js";
import MovieCard from "../components/Movie.js";
import { ApiResponse, MovieResponse } from "../../types/types.js";

export default class MovieListHandler {
  private movieList: MovieList | undefined;

  constructor(private movieService: MovieService) {}

  async initMovieList(query?: string) {
    const moviesData = query
      ? await this.movieService.searchMovies(query, 1)
      : await this.movieService.getPopularResults();

    this.updateMovieList(moviesData);
    this.handleMoreClickButton(moviesData);
    this.movieList?.updateMovieListTitle(query);
  }

  private updateMovieList(moviesData: ApiResponse<MovieResponse>) {
    MovieList.removeMovieList();
    this.movieList = new MovieList(
      ".thumbnail-list",
      moviesData.movies,
      moviesData.page,
      moviesData.totalPages,
      this.movieService
    );
    this.movieList.init();
  }

  async handleMoreClickButton(newMoviesData: {
    movies: Movie[];
    page: number;
    totalPages: number;
  }) {
    const loadMoreButton = document.querySelector(".add-movie");
    if (!loadMoreButton) return;
    loadMoreButton.addEventListener("click", async () => {
      await this.handleLoadMore(newMoviesData);
    });
  }

  async handleLoadMore(newMoviesData: {
    movies: Movie[];
    page: number;
    totalPages: number;
  }) {
    // if (store.getMode() === "popularAdd") {
    //   newMoviesData = await this.movieService.getPopularResults(pageNumber);
    // } else {
    //   newMoviesData = await this.movieService.searchMovies(query, pageNumber);
    // }
    newMoviesData.movies.forEach((movieData) => {
      const movie = new Movie(movieData);
      const movieCard = new MovieCard(movie);
      this.movieList?.container.appendChild(movieCard.render());
    });
  }
}
