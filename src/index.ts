import './styles/index.css';
import './components/index';
import { $ } from './utils/common';
import { HTMLMovieContainerElement } from './components/MoviesContainer';

const setMovieSiteUrl = (): void => {
  const movieContainer = $('movies-container') as HTMLMovieContainerElement;

  const path = window.location.hash.replace('#', '');
  const URL = new URLSearchParams(path);
  const word = URL.get('q');
  if (word) {
    movieContainer.setSearchWord(word);
    return;
  }

  movieContainer.setSearchWord('');
};

const setDisconnectedError = () => {
  const movieContainer = $('movies-container') as HTMLMovieContainerElement;

  movieContainer.reset();
  $('#more-button')?.classList.add('hide-button');
  $('#skeleton-container')?.classList.add('skeleton-hide');
  movieContainer.setErrorMessage('인터넷 연결이 끊겼습니다.');
};

window.addEventListener('offline', setDisconnectedError);

window.addEventListener('DOMContentLoaded', setMovieSiteUrl);

window.addEventListener('hashchange', setMovieSiteUrl);
