import './styles/index.css';
import './components/index';
import { $ } from './utils/common';
import './apis/tmdb';

window.addEventListener('offline', () => {
  $('movies-container').reset();
  $('#more-button').classList.add('hide-button');
  $('#skeleton-container').classList.add('skeleton-hide');
  $('movies-container').setErrorMessage('인터넷 연결이 끊겼습니다.');
});
