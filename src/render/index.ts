import apiError from './apiError';
import init from './init';
import setupSearchMovie from './setupSearchMovie';
import skeleton from './skeleton';
import updateMoveList from './updateMoveList';

export default {
  init,
  updateMoveList,
  apiError,
  setupSearchMovie,
  createSkeleton: skeleton.create,
};
