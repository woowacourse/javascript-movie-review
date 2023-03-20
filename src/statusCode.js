const MESSAGE = {
  SESSION_EXPIRE: '세션이 만료되었습니다.',
  SERVICE_OFFLINE: '서비스는 일시적으로 오프라인 상태입니다.',
  SERVER_PROBLEM: '서버에 문제가 발생했습니다.',
  OVER_REQUEST_TIME: '요청시간이 초과되었습니다.',
  UNKNOWN: '알 수 없는 오류입니다.',
};

const errorMessage = {
  9: MESSAGE.SERVICE_OFFLINE,
  24: MESSAGE.OVER_REQUEST_TIME,
  17: MESSAGE.SESSION_EXPIRE,
  37: MESSAGE.SESSION_EXPIRE,
  43: MESSAGE.SERVER_PROBLEM,
};

export const statusCodeToErrorMessage = (status_code) => {
  return errorMessage[status_code] || MESSAGE.UNKNOWN;
};
