import {
  DetailMovie,
  FailedResponse,
  Movie,
  MovieDataResponse,
  MovieList,
  MovieResults,
  Options,
} from './types';
import { handleError } from './utils/handleError';

export const getAPIUrl = (params: string, options?: Options) =>
  `https://api.themoviedb.org/3${params}?api_key=${process.env.MOVIE_API_KEY}&language=ko-KR&page=${
    options?.page || 1
  }&query=${options?.query}`;

export const fetchMovies = async (params: string, options: Options): Promise<MovieList> => {
  const API_URL = getAPIUrl(params, options);
  try {
    if (!navigator.onLine) {
      throw new Error('네트워크 오프라인이 감지되었습니다');
    }
    const res = await fetch(API_URL);
    if (!res.ok) {
      const error: FailedResponse = await res.json();
      throw new Error(error.status_message);
    }

    const data: MovieDataResponse = await res.json();
    const movies: readonly Movie[] = data.results.map((result: MovieResults) => ({
      id: result.id,
      title: result.title,
      posterPath: result.poster_path,
      voteAverage: result.vote_average,
    }));

    return { movies: movies, totalPages: data.total_pages };
  } catch (error) {
    if (error instanceof Error) {
      handleError(error.message);
    }
    throw new Error();
  }
};

export const fetchMovie = async (params: string) => {
  const API_URL = getAPIUrl(params);
  try {
    if (!navigator.onLine) {
      throw new Error('네트워크 오프라인이 감지되었습니다');
    }
    const res = await fetch(API_URL);
    if (!res.ok) {
      const error: FailedResponse = await res.json();
      throw new Error(error.status_message);
    }

    const data = await res.json();
    const movie: DetailMovie = {
      id: data.id,
      title: data.title,
      voteAverage: data.vote_average,
      genres: data.genres,
      overview: data.overview,
      posterPath: data.poster_path,
    };

    return movie;
  } catch (error) {
    if (error instanceof Error) {
      handleError(error.message);
    }
    throw new Error();
  }
};
