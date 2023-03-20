import apiError from './renderMessage';
import init from './init';
import setupPopularMovie from './setupPopularMovie';
import setupSearchMovie from './setupSearchMovie';
import skeleton from './skeleton';
import updateMoveList from './updateMoveList';

export default {
  init,
  updateMoveList,
  renderMessage: apiError,
  setupSearchMovie,
  setupPopularMovie,
  createSkeleton: skeleton.create,
};
