const STATUS_CODE_TO_MESSAGE = {
  400: "Bad Request: 잘못된 요청입니다. 요청의 구문이 잘못되었습니다.",
  401: "Unauthorized: 인증되지 않은 접근입니다. 인증이 필요합니다.",
  403: "Forbidden: 접근이 거부되었습니다. 권한이 없습니다.",
  404: "Not Found: 해당 자료를 찾을 수 없습니다.",
  405: "Method Not Found: 잘못된 요청입니다.",
  406: "Not Acceptable: 허용되지 않은 요청입니다. 서버가 요청을 수락할 수 없습니다.",
  422: "Unprocessable Entity: 유효하지 않은 요청입니다.",
  429: "Too Many Requests: 너무 많은 요청입니다. 잠시 후 다시 시도해 주세요",

  500: "Internal Server Error: 서버에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
  501: "Not Implemented: 서버가 요청을 처리할 수 없습니다. 잠시 후 다시 시도해주세요.",
  502: "Bad Gateway: 게이트웨이 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
  503: "Service Unavailable: 서버 점검 중입니다. 잠시 후 다시 시도해주세요.",
  504: "Gateway Timeout: 게이트웨이 시간 초과가 발생했습니다. 잠시 후 다시 시도해주세요.",
};

export default class APIError extends Error {
  constructor(statusCode: number) {
    if (!isStatusCode(statusCode)) {
      throw Error("Invalid status code");
    }

    super(STATUS_CODE_TO_MESSAGE[statusCode]);
  }
}

const isStatusCode = (
  statusCode: number
): statusCode is keyof typeof STATUS_CODE_TO_MESSAGE => {
  return Object.keys(STATUS_CODE_TO_MESSAGE).includes(String(statusCode));
};
