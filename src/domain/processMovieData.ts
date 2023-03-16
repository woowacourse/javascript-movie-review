import { FetchedMovieJson } from './fetchJson';

export type MovieItem = {
  title: string;
  posterPath: string;
  voteAverage: number;
};

export type Movie = {
  page: number;
  movies: MovieItem[];
  totalPages: number;
};

const MOVIE_IMAGE_URL = 'https://image.tmdb.org/t/p/w220_and_h330_face/';

export const processMovieData = ({ page, results, total_pages: totalPages }: FetchedMovieJson) => {
  const movies: MovieItem[] = results.map(result => ({
    title: result.title,
    posterPath: `${MOVIE_IMAGE_URL}${result.poster_path}`,
    voteAverage: result.vote_average,
  }));

  return { page, movies, totalPages };
};
