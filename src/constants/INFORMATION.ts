import IButton from '../interfaces/IButton';

const BUTTON = {
  search: {
    innerText: '검색',
    classes: ['search-button'],
  } as IButton,

  showMore: {
    innerText: '더 보기',
    classes: ['btn', 'primary', 'full-width'],
  } as IButton,
};

const CONTAINER_TITLE = {
  popular: '지금 인기 있는 영화',
  searchResult: ' 검색 결과',
};

export { BUTTON, CONTAINER_TITLE };
