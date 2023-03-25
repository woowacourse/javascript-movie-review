import App from './App';

import { storage } from './utils';

import { PERSONAL_VOTE_KEY } from './constants/storageKey';

import './css/reset.css';
import './css/common.css';
import './css/modal.css';
import './css/detailMovieCard.css';

if (!storage.getLocalStorage(PERSONAL_VOTE_KEY)) {
  storage.setLocalStorage(PERSONAL_VOTE_KEY, []);
}

new App();
