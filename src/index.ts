import './styles/index.css';
import './components/index';
import { $ } from './utils/common';
import { MovieConatainerInformation } from './components/MoviesContainer';

window.addEventListener('offline', () => {
  const movieContainer = $('movies-container') as MovieConatainerInformation;

  movieContainer.reset();
  $('#more-button')?.classList.add('hide-button');
  $('#skeleton-container')?.classList.add('skeleton-hide');
  movieContainer.setErrorMessage('인터넷 연결이 끊겼습니다.');
});
