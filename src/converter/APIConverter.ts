import {
  MovieDetail,
  MovieDetailAPI,
  MovieItem,
  MovieItemAPI,
  MovieResponse,
  MovieResponseAPI,
} from '../types/Movie.types';

const convertToMovieItem = (item: MovieItemAPI): MovieItem => ({
  id: item.id,
  title: item.title,
  overview: item.overview,
  poster_path: item.poster_path,
  release_date: item.release_date,
  vote_average: item.vote_average,
});

export const convertToMovieResponse = (
  response: MovieResponseAPI,
): MovieResponse => ({
  page: response.page,
  results: response.results.map(convertToMovieItem),
  total_pages: response.total_pages,
  total_results: response.total_results,
});

export const convertToMovieDetail = (detail: MovieDetailAPI): MovieDetail => ({
  id: detail.id,
  title: detail.title,
  overview: detail.overview,
  poster_path: detail.poster_path,
  release_date: detail.release_date,
  genres: detail.genres,
  vote_average: detail.vote_average,
  runtime: detail.runtime,
});
