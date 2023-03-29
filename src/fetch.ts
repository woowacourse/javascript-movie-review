import { DetailMovie, Movie, MovieDataResponse, MovieList, Options } from './types';
import { request } from './utils/request';

export const getAPIUrl = (params: string, options?: Options) =>
  `https://api.themoviedb.org/3${params}?api_key=${process.env.MOVIE_API_KEY}&language=ko-KR&page=${
    options?.page || 1
  }&query=${options?.query || ''}`;

export const fetchMovies = async (params: string, options: Options): Promise<MovieList> => {
  const API_URL = getAPIUrl(params, options);

  const data: MovieDataResponse = await request(API_URL);
  const movies: readonly Movie[] = data.results.map((result) => ({
    id: result.id,
    title: result.title,
    posterPath: result.poster_path,
    voteAverage: result.vote_average,
  }));

  return { movies: movies, totalPages: data.total_pages };
};

export const fetchMovie = async (params: string) => {
  const API_URL = getAPIUrl(params);

  const data = await request(API_URL);
  const movie: DetailMovie = {
    id: data.id,
    title: data.title,
    voteAverage: data.vote_average,
    genres: data.genres,
    overview: data.overview,
    posterPath: data.poster_path,
  };

  return movie;
};
