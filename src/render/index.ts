import apiError from './apiError';
import init from './init';
import modal from './modal';
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
  openModal: modal.open,
  updateModal: modal.update,
  closeModal: modal.close,
};
