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

  closeModal: {
    innerText: 'X',
    classes: ['close-button'],
  } as IButton,

  voteStar: {
    innerText: '',
    classes: ['item-votestar'],
  } as IButton,

  moveTop: {
    innerText: '🔝',
    classes: ['move-top-button'],
  } as IButton,
};

const CONTAINER_TITLE = {
  popular: '지금 인기 있는 영화',
  searchResult: ' 검색 결과',
};

const LOCAL_VOTE = {
  0: '이 영화 어때요?',
  2: '최악이에요',
  4: '별로에요',
  6: '그저 그래요',
  8: '훌륭해요',
  10: '최고에요',
};

const FETCHING_MOVIE_MESSAGE = '🍿 영화 데이터를 불러오는 중입니다 🍿';

const DEVICE_WIDTH = {
  desktopMin: 1200,
  tabletMax: 1199,
  tabletMin: 768,
  mobileMax: 767,
};

export { BUTTON, CONTAINER_TITLE, LOCAL_VOTE, FETCHING_MOVIE_MESSAGE, DEVICE_WIDTH };
