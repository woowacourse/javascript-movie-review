import { TMDBGenres, TMDBResponse } from '../response.type';

type TMDBGetMoviePopular = {
  path: '/movie/popular';
  response: TMDBResponse;
};

type TMDBSearchMovie = {
  path: '/search/movie';
  response: TMDBResponse;
};

type TMDBGetGenre = {
  path: '/genre/movie/list';
  response: TMDBGenres;
};

const BASE_URL = 'https://api.themoviedb.org/3';

type TMDBAPI = TMDBGetMoviePopular | TMDBGetGenre | TMDBSearchMovie;

export const MovieFetcher = {
  async fetch<Path extends TMDBAPI['path']>(
    path: Path,
    url: string,
  ): Promise<Extract<TMDBAPI, { path: Path }>['response']> {
    const res = await fetch(`${BASE_URL}${path}${url}`);
    if (!res.ok) throw await res.json();

    const response = await res.json();
    return response;
  },
};
