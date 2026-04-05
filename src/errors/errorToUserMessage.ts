import { ApiError, ApiParseError, ConfigError, DomainError, EmptyQueryError, NetworkError } from "./DomainErrors";

export const errorToUserMessage = (error: unknown): string => {
  if (error instanceof EmptyQueryError) return error.message;

  if (error instanceof NetworkError) {
    return "네트워크 연결을 확인해주세요.";
  }

  if (error instanceof ApiError) {
    if (error.status === 401) return "API 인증에 실패했습니다. 관리자에게 문의해주세요.";
    if (error.status === 404) return "요청한 정보를 찾을 수 없습니다.";
    if (error.status >= 500) return "서버에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.";
    return "영화 정보를 불러오지 못했습니다.";
  }

  if (error instanceof ApiParseError) {
    return "응답을 해석하지 못했습니다. 잠시 후 다시 시도해주세요.";
  }

  if (error instanceof ConfigError) {
    return "앱 설정에 문제가 있습니다. 관리자에게 문의해주세요.";
  }

  if (error instanceof DomainError) return error.message;

  // 예상 못한 에러: 내부 로그는 콘솔에, 사용자에겐 일반 메시지
  console.error("[unhandled]", error);
  return "알 수 없는 오류가 발생했습니다.";
};
