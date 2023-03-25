export const MESSAGE = {
  OFFLINE: '인터넷이 연결되지 않았씁니다',
  SESSION_EXPIRE: '세션이 만료되었습니다.',
  SERVICE_OFFLINE: '서비스는 일시적으로 오프라인 상태입니다.',
  SERVER_PROBLEM: '서버에 문제가 발생했습니다.',
  OVER_REQUEST_TIME: '요청시간이 초과되었습니다.',
  UNKNOWN: '알 수 없는 오류입니다.',
};

export const statusCodeToErrorMessage = (status_code: number) => {
  switch (status_code) {
    case 9:
      return MESSAGE.SERVICE_OFFLINE;
    case 24:
      return MESSAGE.OVER_REQUEST_TIME;
    case 17 || 37:
      return MESSAGE.SESSION_EXPIRE;
    case 43:
      return MESSAGE.SERVER_PROBLEM;
    default:
      return MESSAGE.UNKNOWN;
  }
};
