import { ERROR_MESSAGE } from '../constants/message';
import { genre } from '../constants/movie';
import { IMAGE_BASE_URL, POPULAR_MOVIES_URL, SEARCH_MOVIES_URL } from '../constants/url';
import { BadRequestError, InvalidRequestError, NotFoundError, ServerError, UnAuthorizedError } from '../errors/error';
import { Movie, MovieResponse, MovieResponseResult, MovieSearchResult } from '../types/movie';
import fetcher from './fetcher';

export const getPopularMovies = async (page: number): Promise<MovieSearchResult> => {
  const params = `?language=ko-KR&page=${page}`;
  const { results, total_pages, total_results } = await fetcher.get<MovieResponse>(POPULAR_MOVIES_URL + params);
  return { movies: results.map(parseMovieResponse), totalPages: total_pages, movieCount: total_results };
};

export const searchMoviesByTitle = async (title: string, page: number): Promise<MovieSearchResult> => {
  const params = `?query=${title}&include_adult=false&language=en-US&page=${page}`;
  const { results, total_pages, total_results } = await fetcher.get<MovieResponse>(SEARCH_MOVIES_URL + params);
  return { movies: results.map(parseMovieResponse), totalPages: total_pages, movieCount: total_results };
};

const parseMovieResponse = (movieResponse: MovieResponseResult): Movie => {
  const { id, title, poster_path, vote_average, genre_ids, overview } = movieResponse;
  const movie: Movie = {
    id,
    title,
    imageSrc: `${IMAGE_BASE_URL}/original/${poster_path}`,
    score: vote_average,
    genre: genre_ids.map(genre_id => genre[genre_id]),
    description: overview,
  };

  return movie;
};

const handleError = (status: number) => {
  if (status === 400) throw new BadRequestError(ERROR_MESSAGE.BAD_REQUEST);
  else if (status === 401) throw new UnAuthorizedError(ERROR_MESSAGE.UNAUTHORIZED);
  else if (status === 404) throw new NotFoundError(ERROR_MESSAGE.NOT_FOUND);
  else if (status === 500 || status === 501 || status === 502 || status === 503)
    throw new ServerError(ERROR_MESSAGE.SERVER_ERROR);
  else if (status !== 200) throw new InvalidRequestError(ERROR_MESSAGE.INVALID_REQUEST);
};
