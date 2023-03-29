import { ERROR_MESSAGE } from './CONSTANT';
import { $ } from './utils';

export const validation = {
  inputText(text: string) {
    const textArray = text.split('').filter((elem) => elem !== ' ');

    if (textArray.length < 1) throw new Error(ERROR_MESSAGE.MIN_INPUT_KEYWORD);
    if (textArray.length > 10) throw new Error(ERROR_MESSAGE.MAX_INPUT_KEYWORD);
  },
  api(response: number) {
    if (response >= 400 && response < 500) throw new Error(ERROR_MESSAGE.HTTP_400);
    if (response >= 500 && response < 600) throw new Error(ERROR_MESSAGE.HTTP_500);
  },
};

export function renderError(message: string) {
  const pageHeaderElem = $('.page-header') as HTMLElement;
  const parentElem = $('.item-list') as HTMLElement;
  const moreButton = $('.view-more-button') as HTMLElement;

  pageHeaderElem.innerHTML = message;
  parentElem.innerHTML = '';
  moreButton.style.display = 'none';
}
