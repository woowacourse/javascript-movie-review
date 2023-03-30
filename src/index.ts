import './styles/index.css';
import './components/index';
import { getHashURLParams } from './utils/domain';
import { $ } from './utils/common';
import { HTMLModalElement } from './components/Modal';
import { HTMLMovieContainerElement } from './components/MoviesContainer';
import { SCROLL_HIDDEN_CLASSNAME } from './constants';

const setMovieSiteUrl = (): void => {
  const movieContainer = $('movies-container') as HTMLMovieContainerElement;
  const modal = $('#modal') as HTMLDialogElement;

  const { searchWord, movieId } = getHashURLParams();

  if (!navigator.onLine) {
    setDisconnectedError();
    return;
  }

  if (!movieId) {
    $('body')?.classList.remove(SCROLL_HIDDEN_CLASSNAME);
    modal.close();
  }

  if (searchWord && !movieId) {
    movieContainer.setSearchWord(searchWord);
    return;
  }

  if (movieId) {
    setDetailModalEvent(movieId);
    return;
  }

  movieContainer.setSearchWord('');
};

const setStartMovieSiteUrl = () => {
  const movieContainer = $('movies-container') as HTMLMovieContainerElement;
  const { searchWord, movieId } = getHashURLParams();

  if (movieId && searchWord) {
    movieContainer.setSearchWord(searchWord);
    setDetailModalEvent(movieId);
    return;
  }

  if (movieId) {
    setDetailModalEvent(movieId);
  }

  movieContainer.setSearchWord('');
};

const setDetailModalEvent = (detailMovieId: string): void => {
  const modal = $('movie-modal') as HTMLModalElement;

  modal.setMovieId(detailMovieId);
};

const setDisconnectedError = (): void => {
  const movieContainer = $('movies-container') as HTMLMovieContainerElement;

  movieContainer.reset();
  $('#more-button')?.classList.add('hide');
  $('#more-button')?.classList.add('hide-button');
  $('#skeleton-container')?.classList.add('skeleton-hide');

  movieContainer.setErrorMessage('인터넷 연결이 끊겼습니다.');
};

window.addEventListener('offline', setDisconnectedError);

window.addEventListener('load', setStartMovieSiteUrl);

window.addEventListener('hashchange', setMovieSiteUrl);
