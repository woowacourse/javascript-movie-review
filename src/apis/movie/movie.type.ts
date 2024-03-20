import MovieAPI from './movie';

export type FetchMovieType = keyof typeof MovieAPI.URL_MAP;
