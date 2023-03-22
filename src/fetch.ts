import {
  FailedResponse,
  Movie,
  MovieDataResponse,
  MovieList,
  MovieResults,
  Options,
} from './types';

export const getAPIUrl = (params: string, options: Options) =>
  `https://api.themoviedb.org/3${params}?api_key=${process.env.MOVIE_API_KEY}&language=ko-KR&page=${options.page}&query=${options.query}`;

export const fetchMovies = async (params: string, options: Options): Promise<MovieList> => {
  const API_URL = getAPIUrl(params, options);
  try {
    const res = await fetch(API_URL);
    if (!res.ok) {
      const error: FailedResponse = await res.json();
      throw new Error(error.status_message);
    }
    const data: MovieDataResponse = await res.json();
    const movies: Movie[] = data.results.map((result: MovieResults) => ({
      title: result.title,
      posterPath: result.poster_path,
      voteAverage: result.vote_average,
    }));

    return { movies: movies, totalPages: data.total_pages };
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
    throw new Error();
  }
};
