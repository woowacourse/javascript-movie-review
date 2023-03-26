import './styles/index.css';
import './components/index';
import { $ } from './utils/common';
import { HTMLMovieContainerElement } from './components/MoviesContainer';
import { HTMLModalElement } from './components/Modal';

const setMovieSiteUrl = (): void => {
  const movieContainer = $('movies-container') as HTMLMovieContainerElement;

  const path = window.location.hash.replace('#', '');
  const URL = new URLSearchParams(path);
  const searchWord = URL.get('q');
  const detailMovieId = URL.get('id');

  console.log(detailMovieId, searchWord);
  if (searchWord) {
    movieContainer.setSearchWord(searchWord);
    return;
  }

  if (detailMovieId) {
    setDetailModal(detailMovieId);
    return;
  }
};

const setDisconnectedError = () => {
  const movieContainer = $('movies-container') as HTMLMovieContainerElement;

  movieContainer.reset();
  $('#more-button')?.classList.add('hide-button');
  $('#skeleton-container')?.classList.add('skeleton-hide');
  movieContainer.setErrorMessage('인터넷 연결이 끊겼습니다.');
};

const setDetailModal = async (id: string) => {
  const modal = $('movie-modal') as HTMLModalElement;
  modal.setMovieId(id);
  modal.openModal();
};

window.addEventListener('offline', setDisconnectedError);

window.addEventListener('DOMContentLoaded', setMovieSiteUrl);

window.addEventListener('hashchange', setMovieSiteUrl);
