export const STATUS_MESSAGE = {
  400: `🚨Bad Request🚨\n 잘못된 요청입니다. 요청의 구문이 잘못되었습니다.`,
  401: `🔒Unauthorized🔒\n 인증되지 않은 접근입니다. 인증이 필요합니다.`,
  403: `⛔️Forbidden⛔️\n 접근이 거부되었습니다. 권한이 없습니다.`,
  404: `❌Not Found❌\n 해당 자료를 찾을 수 없습니다.`,
  422: `🤔Unprocessable Entity🤔\n 유효하지 않은 요청입니다.`,
  429: `🚨Too Many Requests🚨\n 너무 많은 요청입니다. 잠시 후 다시 시도해 주세요`,
  500: `🔥Internal Server Error🔥\n 서버에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요.`,
  501: `❓Not Implemented❓\n 서버가 요청을 처리할 수 없습니다. 잠시 후 다시 시도해주세요.`,
  502: `🚧Bad Gateway🚧\n 게이트웨이 오류가 발생했습니다. 잠시 후 다시 시도해주세요.`,
  503: `⚒️Service Unavailable⚒️\n 서버 점검 중입니다. 잠시 후 다시 시도해주세요.`,
  504: `⏰Gateway Timeout⏰\n 게이트웨이 시간 초과가 발생했습니다. 잠시 후 다시 시도해주세요.`,
} as const;
