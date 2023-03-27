export const MAX_MOVIES_PER_PAGE = 20;

export const POPULAR_TITLE = '지금 인기 있는 영화';

export const MAXIMUM_PAGE = 500;

export const VOTE_MESSAGE: Record<number, string> = {
  0: '',
  2: '2 최악이에요',
  4: '4 별로예요',
  6: '6 보통이에요',
  8: '8 재미있어요',
  10: '10 명작이에요',
};

export const STATUS_MESSAGES_MAP: Record<number, string[]> = {
  401: ['인증되지 않았어요', '만약 로그인이 풀렸다면 다시 인증해주세요'],
  403: ['페이지에 접근할 권한이 없어요'],
  404: ['페이지를 찾을 수 없어요', '예전에 있었지만 사라진 페이지일 수도 있어요'],
  500: [
    '서버에 문제가 생겼어요',
    '나중에 다시 시도해 주세요',
    '해결되지 않으면 개발자에게 연락해주세요',
  ],
  503: ['나중에 다시 방문해주세요'],
};
