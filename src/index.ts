import './styles/index.css';
import './components/index';
import { $ } from './utils/common';
import { HTMLMovieContainerElement } from './components/MoviesContainer';
import { HTMLModalElement } from './components/Modal';

const setMovieSiteUrl = (isFirstStart: boolean): void => {
  const movieContainer = $('movies-container') as HTMLMovieContainerElement;
  const modal = $('#modal') as HTMLDialogElement;

  const path = window.location.hash.replace('#', '');
  const URL = new URLSearchParams(path);
  const searchWord = URL.get('q');
  const detailMovieId = URL.get('id');

  if (!detailMovieId) {
    $('body')?.classList.remove('overflow-hidden');
    modal.close();
  }

  if (searchWord && !detailMovieId) {
    movieContainer.setSearchWord(searchWord);
    return;
  }

  if (detailMovieId && isFirstStart && searchWord) {
    movieContainer.setSearchWord(searchWord);
    setDetailModalEvent(detailMovieId);
    return;
  }

  if (detailMovieId && isFirstStart) {
    movieContainer.setSearchWord('');
    setDetailModalEvent(detailMovieId);
    return;
  }

  if (detailMovieId) {
    setDetailModalEvent(detailMovieId);
    return;
  }

  movieContainer.setSearchWord('');
};

const setStartDetailModalEvent = (detailMovieId: string) => {
  const movieContainer = $('movies-container') as HTMLMovieContainerElement;

  movieContainer.setSearchWord('');
  setDetailModal(detailMovieId);
};

const setDetailModalEvent = (detailMovieId: string) => {
  setDetailModal(detailMovieId);
};

const setDisconnectedError = () => {
  const movieContainer = $('movies-container') as HTMLMovieContainerElement;

  movieContainer.reset();
  $('#more-button')?.classList.add('hide-button');
  $('#skeleton-container')?.classList.add('skeleton-hide');
  movieContainer.setErrorMessage('인터넷 연결이 끊겼습니다.');
};

const setDetailModal = (id: string) => {
  const modal = $('movie-modal') as HTMLModalElement;
  modal.setMovieId(id);
};

const IS_FIRST_START = true;
const IS_NOT_FIRST_START = false;

window.addEventListener('offline', setDisconnectedError);

window.addEventListener('load', () => setMovieSiteUrl(IS_FIRST_START));

window.addEventListener('hashchange', () => setMovieSiteUrl(IS_NOT_FIRST_START));
