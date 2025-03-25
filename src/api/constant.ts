export const BASE_URL = 'https://api.themoviedb.org/3';

export const ERROR = {
  VALID_INPUT: '입력한 정보에 문제가 있습니다. 다시 확인해주세요.',
  VALID_AUTHENTICATION: '접근 권한이 없습니다. 로그인 상태를 확인하거나, 권한이 필요한 작업인지 확인해주세요.',
  NOT_FOUND: '요청한 정보를 찾을 수 없습니다.',
  TOO_MANY_REQUEST: '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.',
  SERVER_REQUEST: '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
  UNEXPECTED: '예상치 못한 오류가 발생했습니다. 다시 시도해주세요.',
  NETWORK: '네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.'
} as const;
