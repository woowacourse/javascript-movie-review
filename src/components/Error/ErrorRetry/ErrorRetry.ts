import { ERROR_MESSAGE } from '../../../consts/message';
import NETWORK_ERROR from '../../../assets/network_error.png';
import SYSTEM_ERROR from '../../../assets/system_error.png';
import './ErrorRetry.css';

import '../NotFound/NotFound.css';
import Button from '../../Button/Button';
import { MovieAPIReturnType } from '../../../api/movieAPI.type';
import { deleteParams } from '../../../utils/queryString';
import { QUERY_STRING_KEYS } from '../../../consts/URL';

export type ErrorType = 'NOT_FOUND' | 'NETWORK_ERROR' | 'SERVER_ERROR' | 'FETCHING_ERROR' | 'AUTHENTICATION_FAILED';

export const ErrorRetry = ({
  errorType,
  fetchData,
}: {
  errorType: ErrorType;
  fetchData: () => Promise<MovieAPIReturnType>;
}) => {
  const notFoundBox = document.createElement('div');
  notFoundBox.classList.add('error');

  const erroImage = document.createElement('img');

  erroImage.id = 'error-img';
  erroImage.setAttribute('alt', '에러 이미지');

  const notFoundTitle = document.createElement('div');
  notFoundTitle.id = 'error-title';

  switch (errorType) {
    case 'SERVER_ERROR':
      erroImage.setAttribute('src', SYSTEM_ERROR);
      notFoundTitle.textContent = ERROR_MESSAGE.SERVER_ERROR;

    case 'AUTHENTICATION_FAILED':
      erroImage.setAttribute('src', SYSTEM_ERROR);
      notFoundTitle.textContent = ERROR_MESSAGE.AUTHENTICATION_FAILED;

    case 'FETCHING_ERROR':
      erroImage.setAttribute('src', NETWORK_ERROR);
      notFoundTitle.textContent = ERROR_MESSAGE.FETCH_FAILED;

    default:
      erroImage.setAttribute('src', NETWORK_ERROR);
      notFoundTitle.textContent = ERROR_MESSAGE.NETWORK_ERROR;
  }

  const buttonBox = document.createElement('div');
  buttonBox.classList.add('button-box');

  const homeButton = new Button({
    text: '홈화면으로',
    clickEvent: () => {
      deleteParams(QUERY_STRING_KEYS.QUERY);
      deleteParams(QUERY_STRING_KEYS.PAGE);
      location.reload();
    },
    id: 'home-button',
  }).render();

  const retryButton = new Button({
    text: '재시도',
    clickEvent: fetchData,
    id: 'retry-button',
  }).render();

  buttonBox.append(homeButton);
  buttonBox.append(retryButton);

  const itemList = document.querySelector('.item-list');
  if (!itemList) return;
  itemList.replaceChildren();

  notFoundBox.append(erroImage);
  notFoundBox.append(notFoundTitle);
  notFoundBox.append(buttonBox);

  itemList.append(notFoundBox);
};
