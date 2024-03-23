import IButton from '../interfaces/IButton';

const BUTTONS = {
  search: {
    innerText: '검색',
    classList: ['search-button'],
  } as IButton,

  showMore: {
    innerText: '더 보기',
    classList: ['btn', 'primary', 'full-width'],
  } as IButton,
};

const CONTAINER_TITLE = {
  popular: '지금 인기 있는 영화',
  searchResult: ' 검색 결과',
};

export { BUTTONS, CONTAINER_TITLE };
