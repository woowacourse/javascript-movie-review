import {
  IMovie,
  MovieList,
  MovieListResponse,
  MovieResponse,
} from "../types/movies";

export const mapToMovie = (movie: MovieResponse): IMovie => {
  return {
    id: movie.id,
    backdrop_path: movie.backdrop_path,
    original_language: movie.original_language,
    original_title: movie.original_title,
    overview: movie.overview,
    poster_path: movie.poster_path,
    release_date: movie.release_date,
    title: movie.title,
    vote_average: movie.vote_average,
  };
};

export const mapToMovieList = (
  moviesResponse: MovieListResponse
): MovieList => {
  return {
    page: moviesResponse.page,
    results: moviesResponse.results.map(mapToMovie),
    total_pages: moviesResponse.total_pages,
    total_results: moviesResponse.total_results,
  };
};
