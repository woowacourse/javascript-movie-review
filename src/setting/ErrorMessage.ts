export const ERROR_MESSAGE = {
  FETCH_ERROR: "API 서버 상태가 좋지 않아 데이터를 가져오는데 실패했습니다.",
  NO_DATA: "검색 결과가 없습니다. 다른 검색어를 입력해 보세요.",
  SERVER_ERROR: "서버에서 오류가 발생했습니다. 관리자에게 문의하세요.",
  NETWORK_DISCONNECTED: "인터넷 연결이 끊어졌습니다. 연결을 확인해 주세요.",
  FALLBACK_ERROR:
    "통신 상황이 좋지 않으니, 잠시후 새로고침하고 다시 시도해주세요.",
  RETRY_ERROR:
    "최대 대기 시간(1분)을 초과했습니다. 인터넷 상태를 체크하신뒤에 새로 고침을 해주세요.",
} as const;
