import MovieList from "../components/MovieList";
import { $ } from "../utils/selector";

export const movieApi = {
  page: 1,
  movies: [],
  total_pages: 2,
  total_results: 0,

  async fetchMovieInfo() {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=ko&page=${this.page}`
    );
    const { page, results, total_pages, total_results } = await response.json();

    this.page = page + 1;
    this.movies = [...this.movies, ...results] as any;
    this.total_pages = total_pages;
    this.total_results = total_results;

    const movieList = $("#movie-list") as MovieList;
    movieList.renderMovies();
  },
};
