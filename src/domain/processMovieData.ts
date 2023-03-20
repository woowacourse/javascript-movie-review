import { MOVIE_IMAGE_URL } from '../constants/movieURLs';
import { FetchedMovieJson } from '../types/fetchedMovie';
import { MovieItem } from '../types/movie';

export const processMovieData = ({ page, results, total_pages: totalPages }: FetchedMovieJson) => {
  const movies: MovieItem[] = results.map(result => ({
    title: result.title,
    posterPath: `${MOVIE_IMAGE_URL}${result.poster_path}`,
    voteAverage: result.vote_average,
  }));

  return { page, movies, totalPages };
};
