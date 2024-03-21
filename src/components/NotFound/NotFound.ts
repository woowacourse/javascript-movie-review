import { ERROR_MESSAGE } from '../../consts/error';

export const NotFound = () => {
  const notFoundText = document.createElement('h2');
  notFoundText.id = 'not-found-text';
  notFoundText.textContent = ERROR_MESSAGE.RESULTS_NOT_FOUND;

  const itemList = document.querySelector('.item-list');
  if (!itemList) return;
  itemList.replaceChildren();

  itemList.append(notFoundText);
};
