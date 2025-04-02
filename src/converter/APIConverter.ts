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

export const convertToMovieDetail = (detail: MovieDetailAPI): MovieDetail => {
  const year = detail.release_date ? detail.release_date.split('-')[0] : '';
  let categories = '';

  if (detail.genres && detail.genres.length > 0) {
    categories = detail.genres.map((genre) => genre.name).join(', ');
  }

  const categoryText = `${year}${categories ? ' · ' + categories : ''}`;

  return {
    id: detail.id,
    title: detail.title,
    overview: detail.overview,
    poster_path: detail.poster_path,
    release_date: detail.release_date,
    genres: detail.genres,
    vote_average: detail.vote_average,
    runtime: detail.runtime,
    categoryText,
  };
};
