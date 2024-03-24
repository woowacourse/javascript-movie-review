export const TITLE = {
  POPULER: '지금 인기 있는 영화',
  SEARCH_RESULT: (query: string) => `"${query}" 검색 결과`,
};

export const ERROR_MESSAGE = {
  AUTHENTICATION_FAILED: '인증에 실패하였습니다. \n 유효한 API를 입력해 주세요.',
  SERVER_ERROR: '시스템에 문제가 생겼습니다. \n 다시 시도해 주세요.',
  FETCH_FAILED: '데이터를 불러오기에 실패하였습니다. \n 다시 시도해 주세요.',
  NETWORK_ERROR: '네트워크 연결이 끊겼습니다. \n연결 후 다시 시도해 주세요.',
  RESULTS_NOT_FOUND: '검색 결과가 없습니다.',
};

//https://developer.themoviedb.org/docs/errors
