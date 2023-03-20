import { $ } from './utils';

export const Validation = {
  inputText(text: string) {
    const textArray = text.split('').filter((elem) => elem !== ' ');

    if (textArray.length < 1) throw new Error('1자 이상으로 입력해주세요.');
    if (textArray.length > 10) throw new Error('10자 이하로 입력해주세요.');
  },
  api(response: number) {
    if (response >= 400 && response < 500) throw new Error('잘못된 요청입니다. 확인해주세요.😥');
    if (response >= 500 && response < 600)
      throw new Error('현재 페이지를 실행할 수 없습니다.\n 잠시후 다시 시도해주세요.😥');
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
