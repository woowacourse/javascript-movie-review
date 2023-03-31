import { movieDetailRootKeys, movieRootKeys } from '../constants/movieApi';
import { MovieDetailRoot, MovieRoot } from './movieApi';

export const isMovieRoot = (root: unknown): root is MovieRoot => {
  const value = root as MovieRoot;

  if (!root || typeof root !== 'object') {
    return false;
  }

  return movieRootKeys.every(key => key in value);
};

export const isMovieDetailRoot = (root: unknown): root is MovieDetailRoot => {
  const value = root as MovieDetailRoot;

  if (!root || typeof root !== 'object') {
    return false;
  }

  return movieDetailRootKeys.every(key => key in value);
};
