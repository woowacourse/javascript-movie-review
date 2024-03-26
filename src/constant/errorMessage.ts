const ERROR_MESSAGE = {
  SERVER_ERROR: '서버에 일시적인 문제가 생겼습니다.\n잠시 후에 다시 접속해 주세요.',
  AUTHENTICATION_FAILED: '영화 데이터를 불러오기 위한 API 인증에 실패했습니다.\n관리자에게 문의해 주세요.',
  FETCHING_FAILED: '영화 데이터를 제대로 불러오지 못했습니다.\n잠시 후에 다시 시도해 주세요.',
  NETWORK_DISCONNECTED: '네트워크 에러가 발생했습니다.\n인터넷 연결 상태를 확인 후 다시 시도해 주세요.',
  RESULTS_NOT_JSON_FORMAT: '불러온 영화 데이터 양식이 올바르지 않습니다.\n잠시 후에 다시 시도해 주세요.',
  UNKNOWN_ERROR: '알 수 없는 에러가 발생했습니다.\n잠시 후에 다시 시도해주세요.',
};

export default ERROR_MESSAGE;
