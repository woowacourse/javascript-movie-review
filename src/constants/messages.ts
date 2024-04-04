export const ERROR_MESSAGE = {
  noSearchResult: '검색한 결과를 찾을 수 없습니다.\n다른 검색어로 검색을 해보시겠어요?',
} as const;

export const TITLE = {
  popularMovies: '지금 인기 있는 영화',
  searchResult: '검색결과 입니다.',
} as const;

export const ALERT_MESSAGE = {
  lastPage: '마지막 페이지 입니다!',
  searchInputEmpty: '검색어를 입력해주세요!',
} as const;

interface Star {
  [key: number]: string;
}

export const STAR_MESSAGE: Star = {
  0: '평점 선택',
  2: '최악이에요',
  4: '별로에요',
  6: '보통이에요',
  8: '재미있어요',
  10: '명작이에요',
};
