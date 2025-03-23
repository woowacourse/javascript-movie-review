export const ERROR_MESSAGE = Object.freeze({
  NO_RESULT: '저런! 검색 결과가 없네요 😅',
  FETCH_FAILED: '서버에서 데이터를 불러 오는데 실패했어요 😭',
});

export const STATUS_CODE_MESSAGE: { [key: number]: string } = {
  400: '잘못된 요청입니다.',
  401: '인증되지 않은 요청입니다.',
  403: '접근 권한이 없습니다.',
  404: '찾을 수 없는 페이지입니다.',
  429: '요청이 너무 많습니다.',
  500: '서버 에러가 발생했습니다.',
};
