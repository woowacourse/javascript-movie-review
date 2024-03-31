import ButtonData from '../interfaces/ButtonData';

const BUTTONS = {
  search: {
    innerText: '검색',
    classList: ['search-button'],
  } as ButtonData,

  showMore: {
    innerText: '더 보기',
    classList: ['btn', 'primary', 'full-width'],
  } as ButtonData,

  close: {
    innerText: 'X',
    classList: ['movie-item-detail_close-button'],
  } as ButtonData,
};

const CONTAINER_TITLE = {
  popular: '지금 인기 있는 영화',
  searchResult: ' 검색 결과',
};

const MY_RATING = {
  title: '내 별점',
  default: '0' as '0',
  starCount: 5,
  ment: {
    0: '이 영화 어떤가요?',
    2: '최악이예요',
    4: '별로예요',
    6: '보통이에요',
    8: '재미있어요',
    10: '명작이에요',
  },
};

const EMPTY_OVERVIEW = '해당 영화는 줄거리가 존재하지 않습니다.';

const MOVIE_ITEM = {
  count: 20,
};

const STORAGE_KEY = 'userMovies';

export { BUTTONS, CONTAINER_TITLE, MY_RATING, EMPTY_OVERVIEW, MOVIE_ITEM, STORAGE_KEY };
