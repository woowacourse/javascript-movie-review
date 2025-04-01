import { Movie, MovieDetail, MovieList } from "../types/domain/movies";
import {
  MovieResponse,
  MovieDetailResponse,
  MovieListResponse,
} from "../types/api/response";

export const mapToMovie = (movie: MovieResponse): Movie => {
  return {
    id: movie.id,
    backdropPath: movie.backdrop_path,
    originalLanguage: movie.original_language,
    originalTitle: movie.original_title,
    overview: movie.overview,
    posterPath: movie.poster_path,
    releaseDate: movie.release_date,
    title: movie.title,
    voteAverage: movie.vote_average,
  };
};

export const mapToMovieList = (
  moviesResponse: MovieListResponse
): MovieList => {
  return {
    page: moviesResponse.page,
    results: moviesResponse.results.map(mapToMovie),
    totalPages: moviesResponse.total_pages,
    totalResults: moviesResponse.total_results,
  };
};

export const mapToMovieDetail = (
  movieDetailResponse: MovieDetailResponse
): MovieDetail => {
  return {
    id: movieDetailResponse.id,
    backdropPath: movieDetailResponse.backdrop_path,
    genres: movieDetailResponse.genres,
    overview: movieDetailResponse.overview,
    posterPath: movieDetailResponse.poster_path,
    releaseDate: movieDetailResponse.release_date,
    title: movieDetailResponse.title,
    voteAverage: movieDetailResponse.vote_average,
  };
};
