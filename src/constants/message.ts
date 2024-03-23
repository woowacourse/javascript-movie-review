const MESSAGE = {
  HOME_TITLE: '지금 인기 있는 영화',
  SEARCH_RESULT_FOUND_TITLE: (text: string) => `"${text}" 검색 결과`,
  SEARCH_RESULT_NOT_FOUND_TITLE: (text: string) => `"${text}" 검색 결과가 없습니다`,
};

const ERROR_MESSAGE = {
  BAD_REQUEST: '잘못된 접근입니다! 주소를 다시 입력해주세요.',
  UNAUTHORIZED: '인증이 필요한 요청입니다! 인증 후 다시 이용해주세요.',
  NOT_FOUND: '페이지를 찾을 수 없습니다! 다시 입력해주세요.',
  SERVER_ERROR: '서버에 오류가 발생하였습니다! 잠시 후 다시 시도해주세요.',
  INVALID_REQUEST: '데이터를 불러올 수 없습니다. 다시 시도해주세요.',
};

export { MESSAGE, ERROR_MESSAGE };
