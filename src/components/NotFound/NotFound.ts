import { ERROR_MESSAGE } from '../../consts/error';
import LOGO from '../../assets/search_not_found.png';
import './NotFound.css';

export const NotFound = () => {
  const existingNotFoundBox = document.querySelector('#not-found');
  if (existingNotFoundBox) existingNotFoundBox.remove();

  const notFoundBox = document.createElement('div');
  notFoundBox.setAttribute('id', 'not-found');

  const notFoundText = document.createElement('h2');
  notFoundText.setAttribute('id', 'not-found-text');
  notFoundText.textContent = ERROR_MESSAGE.RESULTS_NOT_FOUND;

  const notFoundImage = document.createElement('img');
  notFoundImage.setAttribute('src', LOGO);
  notFoundImage.setAttribute('id', 'not-found-image');

  const itemView = document.querySelector('.item-view');
  if (!itemView) return;

  const itemList = document.querySelector('.item-list');
  if (!itemList) return;
  itemList.replaceChildren();

  notFoundBox.append(notFoundImage);
  notFoundBox.append(notFoundText);

  itemView.append(notFoundBox);
};
