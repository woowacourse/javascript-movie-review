import { updateMovies } from "../components/movieListHandler";

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
    this.movies = [...this.movies, ...sortMovies(results)] as any;
    this.total_pages = total_pages;
    this.total_results = total_results;

    updateMovies();
  },
};

const sortMovies = (movies: any) =>
  movies.sort((a: any, b: any) => b.popularity - a.popularity);
