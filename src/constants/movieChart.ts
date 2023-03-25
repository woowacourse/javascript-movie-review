export const INITIAL_PAGE = 1;
export const PAGE = 1;
export const LAST_PAGE = 500;
export const PAGINATION = 1;
export const DUMMY_AMOUNT = 20;

export const NO_RESULT = '검색 결과가 없습니다';

export const GENRES = {
  Action: '액션',
  Adventure: '모험',
  Animation: '만화',
  Comedy: '코미디',
  Crime: '범죄',
  Documentary: '다큐',
  Drama: '드라마',
  Family: '가족',
  Fantasy: '판타지',
  History: '역사',
  Horror: '호러',
  Music: '음악',
  Mystery: '미스테리',
  ['Science Fiction']: 'SF',
  ['TV Movie']: 'TV 영화',
  Thriller: '스릴러',
  War: '전쟁',
  Western: '서부',
} as const;

export const MY_VOTE = {
  0: '별점을 선택하세요',
  2: '최악이예요',
  4: '별로예요',
  6: '보통이에요',
  8: '재미있어요',
  10: '명작이에요',
};
