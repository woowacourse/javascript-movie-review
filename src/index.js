import App from './App';
import PersonalVoteHandler from './domain/PersonalVoteHandler';

import { storage } from './utils';

import { PERSONAL_VOTE_KEY } from './constants/storageKey';

import './css/reset.css';
import './css/common.css';
import './css/modal.css';
import './css/detailMovieCard.css';

const personalVoteData = storage.getLocalStorage(PERSONAL_VOTE_KEY);
export const personalVoteHandler = new PersonalVoteHandler(personalVoteData);

window.addEventListener('beforeunload', () => {
  storage.setLocalStorage(PERSONAL_VOTE_KEY, personalVoteHandler.getPersonalVoteData());
});

new App();
