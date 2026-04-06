import { Movie } from "./dto";

import { isObject } from "../utils/type-guards/isObject";

export const fromMovieDto = (movie: unknown) => {
  if (!isObject(movie)) return null;

  if(!('title' in movie)) return null;

  return {
    ...movie,
    poster_path: typeof movie.poster_path === 'string' ? movie.poster_path: null,
  }
}

export const parseMovies = (rawList: unknown): Movie[] => {
  if(!Array.isArray(rawList)) throw new Error("Invalid data");

   return rawList
    .map(fromMovieDto)
    .filter((movie): movie is Movie => movie !== null);
}