import { ERROR_MESSAGE } from '../../../consts/message';
import NotFoundImage from '../../../assets/not_found.png';

import '../NotFound/NotFound.css';

export const NotFound = () => {
  const notFoundBox = document.createElement('div');
  notFoundBox.classList.add('error');

  const notFoundImage = document.createElement('img');
  notFoundImage.setAttribute('src', NotFoundImage);
  notFoundImage.id = 'error-img';
  notFoundImage.setAttribute('alt', '로고 이미지');

  const notFoundTitle = document.createElement('h2');
  notFoundTitle.id = 'error-title';
  notFoundTitle.textContent = ERROR_MESSAGE.RESULTS_NOT_FOUND;

  const notFoundText = document.createElement('ul');
  notFoundText.id = 'error-text';

  const fragment = new DocumentFragment();
  const textInfo1 = document.createElement('li');
  const textInfo2 = document.createElement('li');
  const textInfo3 = document.createElement('li');
  textInfo1.textContent = '- 단어의 철자가 정확한지 확인해 주세요.';
  textInfo2.textContent = '- 일반적인 검색어로 다시 검색해 보세요.';
  textInfo3.textContent = '- 두 단어 이상의 검색어인 경우 띄어쓰기를 확인해 보세요.';

  fragment.append(textInfo1);
  fragment.append(textInfo2);
  fragment.append(textInfo3);

  notFoundText.append(fragment);

  const itemList = document.querySelector('.item-view');
  if (!itemList) return;
  itemList.replaceChildren();

  notFoundBox.append(notFoundImage);
  notFoundBox.append(notFoundTitle);
  notFoundBox.append(notFoundText);

  itemList.append(notFoundBox);
};
