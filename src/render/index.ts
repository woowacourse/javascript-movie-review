import apiError from './apiError';
import init from './init';
import setupPopularMovie from './setupPopularMovie';
import setupSearchMovie from './setupSearchMovie';
import skeleton from './skeleton';
import updateMovieList from './updateMovieList';

export default {
  init,
  updateMovieList,
  apiError,
  setupSearchMovie,
  setupPopularMovie,
  createSkeleton: skeleton.create,
};
