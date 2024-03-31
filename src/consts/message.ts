export const POPULER_TITLE = '지금 인기 있는 영화';
export const SEARCH_RESULT_TITLE = (query: string) => `"${query}" 검색 결과`;

export const ERROR_MESSAGE = {
  AUTHENTICATION_FAILED: '인증에 실패하였습니다. \n 유효한 API를 입력해 주세요.',
  SERVER_ERROR: '시스템에 문제가 생겼습니다. \n 다시 시도해 주세요.',
  FETCH_FAILED: '데이터를 불러오기에 실패하였습니다. \n 다시 시도해 주세요.',
  NETWORK_ERROR: '네트워크 연결이 끊겼습니다. \n연결 후 다시 시도해 주세요.',
  RESULTS_NOT_FOUND: '검색 결과가 없습니다.',
} as const;

export const VOTE_MESSAGE: { [key: string]: string } = {
  0: '점수가 없어요',
  1: '최악이예요',
  2: '별로예요',
  3: '보통이에요',
  4: '재미있어요',
  5: '명작이에요',
};

export const SCORE_MESSAGE = '점수가 반영되었습니다.';
