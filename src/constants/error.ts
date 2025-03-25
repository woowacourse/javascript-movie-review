export const ERROR = {
  DEFAULT: "문제가 발생했습니다. 관리자에게 문의해 주세요.",
  FAIL_CONNECT_API: "API 서버와의 통신에 실패했습니다.",
};

export const STATUS_MESSAGE: Record<string, string> = {
  404: "페이지를 찾을 수 없습니다. 잠시 후에 다시 시도해주세요.",
  500: "서버에 문제가 발생했습니다. 잠시 후에 다시 시도해주세요.",
  503: "서비스를 이용할 수 없습니다. 잠시 후에 다시 시도해주세요.",
};
