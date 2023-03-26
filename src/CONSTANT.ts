export const ERROR_MESSAGE = {
  MIN_INPUT_KEYWORD: '1자 이상 입력해주세요.',
  MAX_INPUT_KEYWORD: '10자 이하로 입력해주세요.',
  HTTP_400: '잘못된 요청입니다. 확인해주세요.😥',
  HTTP_500: '현재 페이지를 실행할 수 없습니다.\n 잠시후 다시 시도해주세요.😥',
};

export const USER_SCORE_TEXT = {
  2: '최악이에요',
  4: '별로에요',
  6: '보통이에요',
  8: '재미있어요',
  10: '명작이에요',
};

export const GENRE: { [key: number]: string } = {
  // 시간되면 API로 장르 가지고 와서 만들기
  // 만약 API 사이트에서 장르 ID를 바꾸면 문제가 될 수 있기에 끌어오는게 더 안정
  28: '액션',
  12: '모험',
  16: '애니메이션',
  35: '코미디',
  80: '범죄',
  99: '다큐멘터리',
  18: '드라마',
  10751: '가족',
  14: '판타지',
  36: '역사',
  27: '공포',
  10402: '음악',
  9648: '미스터리',
  10749: '로맨스',
  878: 'SF',
  10770: 'TV 영화',
  53: '스릴러',
  10752: '전쟁',
  37: '서부',
};

export const localStorageDataName = {
  userStar: 'userStar',
};
