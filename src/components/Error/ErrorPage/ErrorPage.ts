import NETWORK_ERROR from '../../../assets/network_error.png';
import SYSTEM_ERROR from '../../../assets/system_error.png';
import Logo from '../../../assets/logo.png';
import './ErrorPage.css';
import '../NotFound/NotFound.css';
import Button from '../../Button/Button';
import { MovieAPIReturnType, MovieDetailAPIReturnType } from '../../../api/movieAPI.type';
import { redirectToRoot } from '../../../utils/queryString';

export const ErrorPage = ({
  currentError,
  fetchData,
}: {
  currentError: Error;
  fetchData: () => Promise<MovieAPIReturnType | MovieDetailAPIReturnType>;
}) => {
  const notFoundBox = document.createElement('div');
  notFoundBox.classList.add('error');

  const erroImage = document.createElement('img');

  erroImage.id = 'error-img';
  erroImage.setAttribute('alt', '에러 이미지');

  const notFoundTitle = document.createElement('div');
  notFoundTitle.id = 'error-title';

  switch (currentError.name) {
    case 'SERVER_ERROR' || 'AUTHENTICATION_FAILED' || 'NOT_FOUND':
      erroImage.setAttribute('src', SYSTEM_ERROR);
      notFoundTitle.textContent = currentError.message;

    default:
      erroImage.setAttribute('src', NETWORK_ERROR);
      notFoundTitle.textContent = currentError.message;
  }

  const buttonBox = document.createElement('div');
  buttonBox.classList.add('button-box');

  const homeButton = new Button({
    text: '홈화면으로',
    clickEvent: () => {
      redirectToRoot();
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
