import { getPopularParam, getSearchParam } from "./config";

export function fetchSearchMovies(inputValue, movieService) {
  return movieService.fetchMovies(
    "/search/movie",
    getSearchParam(inputValue, movieService.currentPage)
  );
}

export function fetchPopularMovies(movieService) {
  return movieService.fetchMovies(
    "/movie/popular",
    getPopularParam(movieService.currentPage)
  );
}
