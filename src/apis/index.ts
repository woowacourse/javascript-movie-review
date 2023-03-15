const REDIRECT_SERVER_HOST = 'https://ornate-swan-ce5a5e.netlify.app';

export interface GetPopularMoviesRes {
  page: number;
  results: MovieInfo[];
  total_pages: number;
  total_results: number;
}

interface MovieInfo {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const fetchQuery = async (path: string, init?: RequestInit) => {
  const url = new URL(path, REDIRECT_SERVER_HOST);

  const response = await fetch(url, init);
  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.error.message);
  }

  return body;
};

export const getMoviesByKeyword = (keyword: string, page?: number) => {
  return fetchQuery(`tmdb/search/keyword?query=${keyword}&${page ? `page=${page}` : ''}`);
};

export const getPopularMovies = (page: number = 1): Promise<GetPopularMoviesRes> => {
  return fetchQuery(`tmdb/movie/popular?page=${page}`);
};

export const waitFor = async <T>(promise: Promise<T>): Promise<[T, null] | [undefined, Error]> => {
  try {
    const data = await promise;
    return [data, null];
  } catch (err) {
    return [undefined, new Error(err as string)];
  }
};
